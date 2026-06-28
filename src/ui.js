// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore, EDGE_STYLE } from './store';
import { useTheme } from './theme';
import { nodeTypes, buildInitialData } from './nodes/nodeRegistry';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const getNodeID = useStore((state) => state.getNodeID);
    const addNode = useStore((state) => state.addNode);
    const onNodesChange = useStore((state) => state.onNodesChange);
    const onEdgesChange = useStore((state) => state.onEdgesChange);
    const onConnect = useStore((state) => state.onConnect);

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }

            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: buildInitialData(nodeID, type),
            };

            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                connectionLineStyle={EDGE_STYLE}
                fitView
            >
                <Background color={isDark ? '#334155' : '#cbd5e1'} gap={gridSize} />
                <Controls />
                <MiniMap
                    pannable
                    zoomable
                    nodeColor={isDark ? '#475569' : '#cbd5e1'}
                    maskColor={isDark ? 'rgba(2, 6, 23, 0.6)' : 'rgba(241, 245, 249, 0.6)'}
                />
            </ReactFlow>
        </div>
    )
}
