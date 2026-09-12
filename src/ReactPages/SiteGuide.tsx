import ShareBoxes from "@/components/ShareBoxes";
import OutlinedCard from "@/components/SmallUiWidgets";

function SiteGuide() {
    return (
        <main className="sudoku-app" style={{ width: '100%', padding: '6rem 2rem 6rem', maxWidth: '900px', textAlign: 'left', flex: '1 0 auto' }}>
            <h1 className="text-3xl font-bold text-center mb-0 dark:text-white md:mt-2 
                md:text-md xl:text-xl sx:text-sx sm:text-sm">Site Guide</h1>

            <div className="mb-2 grid lg:grid-cols-[1fr_auto] gap-4 items-center">
                <div>
                    <p className="text-center dark:text-[#8b97a8] justify-center col items-center text-gray-600 md:text-md xl:text-xl sx:text-sx sm:text-sm 
                            lg:text-lg max-w-lg mx-auto leading-relaxed mb-6 mt-6 sx:mb-4">
                        The site is constructed by following pages:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-4">
                        <li>
                            <OutlinedCard title="Sudoku Game"
                                href="/" icon={"🎮"} children="This is the main game page and home page" />

                        </li>
                        <li><OutlinedCard title="About"
                            href="/about" icon={"🎮"} children="The About page briefly introduce this site." /></li>
                        <li><OutlinedCard title="FAQ"
                            href="/faq" icon={"🎮"} children="The FAQ page will give answers to the frequently asked questions by the users." /></li>
                        <li><OutlinedCard title="Tips"
                            href="/sudokuTips" icon={"🎮"} children="This is the main game page and home page" /></li>

                        <li><OutlinedCard title="Terms & Conditions" icon={""} children="" href="/termsAndConditions">
                        </OutlinedCard>
                        </li>
                        <li><OutlinedCard title="Privacy Policy" icon={""} children="" href="/privacyPolicy">
                        </OutlinedCard></li>
                        <li><OutlinedCard title="How SudokuPlays Works" icon={""} children="" href="/detailedGuide">
                        </OutlinedCard></li>

                        <li><OutlinedCard title="What's New"
                            href="/changeLog" icon={"🎮"} children="This is the main game page and home page" /></li>
                        <li><OutlinedCard title="Contact"
                            href="/contact" icon={"🎮"} children="This is the main game page and home page" /></li>
                        <li><OutlinedCard title="What's New"
                            href="/changeLog" icon={"🎮"} children="This is the main game page and home page" /></li>
                    </ul>
                </div>
            </div>
            <div className='p-2 mx-auto w-fit'>
                <ShareBoxes score={0} difficulty={''} timeUsed={''} isGameCompleted={false} />
            </div>
            <div className="" style={{ textAlign: 'center', marginTop: '2rem' }}>
                <a href="/" className="new-game-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    Back to Game
                </a>
            </div>
        </main>
    );

}
export default SiteGuide;