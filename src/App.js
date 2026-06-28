import { ThemeProvider } from './theme';
import { Header } from './Header';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
        <Header />
        <PipelineToolbar />
        <main className="relative min-h-0 flex-1">
          <PipelineUI />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
