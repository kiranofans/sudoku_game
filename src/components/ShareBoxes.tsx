import { shareLinks } from "@/hooks/useShareUtils";

interface ShareBoxesProps {
    score: number,
    difficulty: string,
    timeUsed: string,
    isGameCompleted: boolean,
    //If the sharing action buttons are shown in the GameCompletedModal and after the user won a round, show shareResultText.
}

export default function ShareBoxes({ score, difficulty, timeUsed, isGameCompleted }: ShareBoxesProps) {
    const shareText = "🧩 Play relaxing Sudoku puzzles online at SudokuPlays (数独/數獨) — free, fast, and fun! " +
        "Challenge yourself with multiple difficulties! Fully responsive design for phones, tablets, and desktops." +
        "#PuzzleTime #gameonline";
    const shareResultText = `🧩 I completed a ${difficulty} Sudoku puzzle on SudokuPlays! ` +
        `Score: ${score.toLocaleString()} | Time: ${timeUsed}. ` +
        `Come play and try beat my score!`;

    const shareTitle = isGameCompleted ? "Share Result Via" : "If you like the game, help it grow by sharing Sudoku Plays with friends"
    const url = "https://sudokuplays.com";

    function openShare(link: string) {
        window.open(link, "_blank", "noonpener,noreferrer");
    }

    const showShareText = isGameCompleted ? shareResultText : shareText;

    return (
        <div className='space-y-4 w-full overflow-x-auto'>
            <div className='justify-start left-0 w-full dark:text-gray-300'><span>{shareTitle}</span></div>
            <div className="space-x-4 flex flex-row relative justify-center items-center">
                <svg onClick={() => openShare(shareLinks.x(showShareText, url))}
                    className="cursor-pointer hover:opacity-[0.9]"
                    width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby='twitter/X logo'>
                    <mask id="mask0_1470_10074" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_1470_10074)">
                        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="black" />
                        <path d="M13.0354 11.7172L18.0622 6H16.8704L12.505 10.9632L9.02011 6H5L10.2708 13.505L5 19.5H6.19089L10.7992 14.2581L14.4789 19.5H18.5L13.0354 11.7172ZM11.4038 13.5716L10.8696 12.8233L6.62 6.87846H8.45021L11.8802 11.6777L12.4125 12.426L16.8704 18.6649H15.0411L11.4038 13.5716Z" fill="white" />
                    </g>
                </svg>
                <svg onClick={() => openShare(shareLinks.facebook(showShareText, url))}
                    className="cursor-pointer hover:opacity-[0.9]"
                    width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1471_10084)">
                        <mask id="mask0_1471_10084" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_1471_10084)">
                            <path d="M22.6758 0H1.32421C0.592868 0 0 0.592868 0 1.32421V22.6758C0 23.4071 0.592868 24 1.32421 24H22.6758C23.4071 24 24 23.4071 24 22.6758V1.32421C24 0.592868 23.4071 0 22.6758 0Z" fill="#3D5A98" />
                            <path d="M12.8942 21V13.4735H14.663L14.9275 10.5405H12.8942V8.66831C12.8942 7.81927 13.0598 7.23955 13.912 7.23955H15V4.61195C14.4732 4.53368 13.9437 4.49641 13.414 4.50027C11.8476 4.50027 10.7688 5.86334 10.7688 8.37763V10.5405H9V13.4735H10.7688V21H12.8942Z" fill="white" />
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0_1471_10084">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <svg onClick={() => openShare(shareLinks.reddit(showShareText, url))}
                    className="cursor-pointer hover:opacity-[0.9]"
                    width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1473_10102)">
                        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FF4500" />
                        <path d="M17 12.0803C17 11.3976 16.5073 10.8554 15.9068 10.8554C15.6232 10.855 15.3503 10.9773 15.1452 11.1968C14.3925 10.5943 13.362 10.2028 12.2151 10.1526L12.7168 7.52214L14.3476 7.91361C14.3656 8.37549 14.706 8.74702 15.1273 8.74702C15.5574 8.74702 15.9068 8.35555 15.9068 7.87341C15.9068 7.39154 15.5574 7 15.1273 7C14.8227 7 14.5537 7.2008 14.4283 7.49201L12.6094 7.06027C12.5556 7.05013 12.5018 7.06027 12.4659 7.0904C12.4211 7.12053 12.3943 7.17067 12.3854 7.23094L11.8297 10.1626C10.6649 10.2028 9.61644 10.5943 8.85484 11.2069C8.64971 10.9873 8.37685 10.865 8.09319 10.8655C7.48385 10.8655 7 11.4176 7 12.0904C7 12.5923 7.26876 13.0139 7.64521 13.2049C7.62693 13.3276 7.61794 13.4519 7.61832 13.5764C7.61832 15.4637 9.58074 17 12.0001 17C14.4194 17 16.3819 15.4738 16.3819 13.5764C16.3819 13.4519 16.3729 13.3277 16.355 13.2049C16.7312 13.0139 17 12.5822 17 12.0803ZM9.49102 12.9537C9.49102 12.4718 9.8404 12.0803 10.2707 12.0803C10.7008 12.0803 11.0502 12.4717 11.0502 12.9537C11.0502 13.4356 10.7008 13.8273 10.2707 13.8273C9.84046 13.8372 9.49102 13.4356 9.49102 12.9537ZM13.8549 15.273C13.3173 15.8755 12.2957 15.9157 12.0001 15.9157C11.6954 15.9157 10.6739 15.8653 10.1451 15.273C10.0646 15.1826 10.0646 15.042 10.1451 14.9517C10.2258 14.8615 10.3512 14.8615 10.4319 14.9517C10.7725 15.3333 11.4893 15.4637 12.0001 15.4637C12.5108 15.4637 13.2366 15.3332 13.5681 14.9517C13.6488 14.8615 13.7742 14.8615 13.8549 14.9517C13.9265 15.042 13.9265 15.1826 13.8549 15.273ZM13.7115 13.8372C13.2813 13.8372 12.9319 13.4458 12.9319 12.9638C12.9319 12.4819 13.2813 12.0904 13.7115 12.0904C14.1417 12.0904 14.4911 12.4819 14.4911 12.9638C14.4911 13.4356 14.1417 13.8372 13.7115 13.8372Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1473_10102">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                <svg onClick={() => openShare(shareLinks.whatsapp(showShareText, url))}
                    className="cursor-pointer hover:opacity-[0.9]"
                    width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1471_10092)">
                        <circle cx="12" cy="12" r="12" fill="#4CCB5A" />
                        <path d="M7.77358 11.9524C7.76927 12.6993 7.9613 13.4295 8.33044 14.0743L7.71426 16.2671L9.975 15.6901C10.5952 16.0312 11.2945 16.213 12.0072 16.2172L12.009 16.2172C14.3559 16.23 16.2769 14.339 16.2907 12.0023C16.2972 10.8698 15.8605 9.8025 15.0609 8.99703C14.2612 8.19166 13.1945 7.74438 12.0553 7.73769C9.70796 7.72487 7.78728 9.61561 7.77358 11.9524ZM9.10705 13.9678L9.02348 13.8342C8.6722 13.2713 8.48872 12.6221 8.49262 11.9565C8.50397 10.0143 10.1004 8.4428 12.0527 8.45347C12.9982 8.45903 13.8848 8.83082 14.5495 9.50021C15.2141 10.1697 15.577 11.0567 15.5717 11.9981C15.5602 13.9403 13.9638 15.512 12.0129 15.5014L12.0115 15.5014C11.3763 15.4976 10.7542 15.3243 10.2127 15.0004L10.0838 14.9234L8.74223 15.2657L9.10705 13.9678Z" fill="url(#paint0_linear_1471_10092)" />
                        <path d="M11.0601 10.8167C11.0078 10.6847 10.9393 10.675 10.8774 10.6663C10.8267 10.6592 10.7685 10.6533 10.7104 10.6472C10.6522 10.6412 10.5558 10.6502 10.4681 10.7171C10.3803 10.7841 10.1361 10.9427 10.0976 11.3128C10.0591 11.6829 10.3345 12.0731 10.3728 12.1279C10.4112 12.1825 10.8895 13.0245 11.7446 13.4182C12.4552 13.7454 12.6103 13.7111 12.7715 13.7152C12.9328 13.7193 13.3065 13.5869 13.3974 13.4188C13.4883 13.2507 13.504 13.1001 13.4854 13.0664C13.4669 13.0328 13.4107 13.0079 13.3274 12.9613C13.2441 12.9146 12.8342 12.688 12.7569 12.6546C12.6795 12.6212 12.6227 12.6026 12.5567 12.6719C12.4907 12.7411 12.3061 12.8931 12.25 12.938C12.1939 12.983 12.1424 12.984 12.0591 12.9373C11.9757 12.8905 11.7031 12.7819 11.3965 12.491C11.158 12.2647 11.0086 12.0002 10.9655 11.9196C10.9225 11.8391 10.9721 11.8031 11.0198 11.7701C11.0624 11.7405 11.1161 11.6914 11.1643 11.652C11.2124 11.6126 11.2302 11.5827 11.2645 11.5356C11.2988 11.4884 11.2888 11.443 11.2709 11.4031C11.253 11.3632 11.1222 10.9735 11.0601 10.8167Z" fill="white" />
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_1471_10092" x1="11.9907" y1="16.2904" x2="12.0374" y2="7.7376" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F9F9F9" />
                            <stop offset="1" stop-color="white" />
                        </linearGradient>
                        <clipPath id="clip0_1471_10092">
                            <rect width="24" height="24" rx="12" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                <svg onClick={() => openShare(shareLinks.linkedin(showShareText, url))}
                    className="cursor-pointer hover:opacity-[0.9]"

                    width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1479_10122)">
                        <path d="M42.6066 0.000174196H3.39344C2.50372 -0.0088805 1.64675 0.335385 1.01056 0.95743C0.374375 1.57948 0.0109387 2.42849 0 3.31818V42.6894C0.0129169 43.5777 0.377223 44.4248 1.0132 45.0452C1.64917 45.6657 2.50501 46.0089 3.39344 45.9998H42.6066C43.4963 46.0069 44.3527 45.6614 44.9886 45.039C45.6244 44.4166 45.9881 43.5678 46 42.678V3.30687C45.9841 2.41979 45.6188 1.57482 44.9833 0.955631C44.3479 0.336441 43.4938 -0.00692244 42.6066 0.000174196Z" fill="#0076B2" />
                        <path d="M10.4285 18.6399H15.8171V36H10.4285V18.6399ZM13.1243 10C13.7423 10 14.3465 10.1835 14.8604 10.5274C15.3742 10.8713 15.7747 11.36 16.011 11.9318C16.2474 12.5036 16.3091 13.1327 16.1883 13.7396C16.0675 14.3465 15.7697 14.9039 15.3324 15.3413C14.8952 15.7786 14.3382 16.0763 13.732 16.1967C13.1257 16.3171 12.4974 16.2547 11.9266 16.0175C11.3558 15.7802 10.868 15.3788 10.5251 14.864C10.1821 14.3492 9.99941 13.7441 10 13.1252C10.0008 12.2961 10.3303 11.5012 10.9161 10.9152C11.502 10.3292 12.2962 10 13.1243 10ZM19.1973 18.6399H24.3628V21.0233H24.4342C25.1543 19.6588 26.9098 18.2198 29.5312 18.2198C34.9883 18.2079 36 21.8038 36 26.4664V36H30.6114V27.5538C30.6114 25.5428 30.5756 22.9538 27.8114 22.9538C25.0472 22.9538 24.577 25.1466 24.577 27.4227V36H19.1973V18.6399Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1479_10122">
                            <rect width="46" height="46" rx="23" fill="white" />
                        </clipPath>
                    </defs>
                </svg>


            </div>
        </div>
    );


}

