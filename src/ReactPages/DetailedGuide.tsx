import Layout from '@/components/Layout';
import { ThemeProvider } from '@/components/ThemeContext';

function DetailedGuide() {
    return (
        <ThemeProvider>
            <Layout>
                <main className='sudoku-app' style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', flex: '1 0 auto' }}>
                    <h1 className="text-3xl font-bold text-center mt-6 mb-6 dark:text-white">How SudokuPlays Works</h1>

                    <div className="">
                        <p className="text-xl text-center justify-center items-center">
                            Under Construction
                        </p>
                        <img
                            className="w-200 h-140"
                            src="/images/png/under-construction.png"
                            alt="Under Construction"
                        />
                    </div>
                </main>
            </Layout>
        </ThemeProvider>
    );
}
export default DetailedGuide;