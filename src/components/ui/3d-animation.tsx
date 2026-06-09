import React, { useEffect, useRef } from 'react';

/**
 * Renders the 3D poem animation hero section.
 */
export const PoemAnimation = ({ poemHTML, backgroundImageUrl, boyImageUrl }: { poemHTML: string, backgroundImageUrl: string, boyImageUrl: string }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    // This effect handles the responsive scaling of the animation container.
    useEffect(() => {
        function adjustContentSize() {
            if (contentRef.current) {
                const viewportWidth = window.innerWidth;
                const baseWidth = 1000;
                const scaleFactor = viewportWidth < baseWidth ? (viewportWidth / baseWidth) * 0.9 : 1;
                contentRef.current.style.transform = `scale(${scaleFactor})`;
            }
        }

        adjustContentSize();
        window.addEventListener("resize", adjustContentSize);
        return () => window.removeEventListener("resize", adjustContentSize);
    }, []);

    return (
        <header className="relative w-full h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-enactus-black pt-20 pb-12">
            <div className="container relative z-10 flex flex-col items-center justify-center w-full h-full">
                <div 
                    ref={contentRef} 
                    className="content relative" 
                    style={{ display: 'block', width: '1000px', height: '562px', transformOrigin: 'center center' }}
                >
                    <div className="container-full absolute inset-0">
                        <div className="animated hue"></div>
                        <img className="backgroundImage absolute inset-0 w-full h-full object-cover opacity-80" src={backgroundImageUrl} alt="An old stone courtyard at dawn" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                        {boyImageUrl && (
                            <img className="boyImage absolute inset-0 w-full h-full object-contain z-10" src={boyImageUrl} alt="A man and woman practicing with swords" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                        )}
                        
                        <div className="container absolute inset-0 perspective-[1000px]">
                            <div className="cube">
                                <div className="face top"></div>
                                <div className="face bottom"></div>
                                <div className="face left text" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                                <div className="face right text" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                                <div className="face front"></div>
                                <div className="face back text" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                            </div>
                        </div>

                        <div className="container-reflect absolute inset-0 perspective-[1000px] transform scale-y-[-1] opacity-30 mt-[562px] filter blur-sm">
                            <div className="cube">
                                <div className="face top"></div>
                                <div className="face bottom"></div>
                                <div className="face left text" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                                <div className="face right text" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                                <div className="face front"></div>
                                <div className="face back text" dangerouslySetInnerHTML={{ __html: poemHTML }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
