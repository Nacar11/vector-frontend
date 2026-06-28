// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeDefinitions } from './nodes/nodeRegistry';

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {nodeDefinitions.map((def) => (
                    <DraggableNode key={def.type} type={def.type} label={def.label} />
                ))}
            </div>
        </div>
    );
};
