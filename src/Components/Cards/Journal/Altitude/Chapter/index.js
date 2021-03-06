import React, { Component } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconButton, Tooltip, Button } from '@material-ui/core';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Deck from '../../../Common/Test/Deck';

import './index.less';

import PhotoSelectSideBar from '../../../../PhotoSelectSideBar';
import AddPage from '../AddPage';
import DescriptionPage from '../DescriptionPage';

gsap.registerPlugin(ScrollTrigger);

export default class Chapter extends Component {
    timeline = null;
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
            selectedAsset: null,
            viewState: props.chapter.camera,
            interactiveMap: false,
            photoSliderOpen: false,
            addPageDialogOpen: false,
        }
        this.ref = React.createRef(null);
    }

    componentDidMount() {
        setTimeout(() => this.setupScroll(), 2000);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chapter.pages !== this.props.chapter.pages) {
            this.setupScroll();
        }
    }

    componentWillUnmount() {
        if (this.timeline) {
            this.timeline.kill();
        }
    }

    setupScroll = () => {
        if (this.timeline) {
            this.timeline.clear(true);
        }

        this.timeline = gsap.timeline({
            scrollTrigger: {
                trigger: this.ref.current,
                start: 'top top+=260',
                end: "+=" + (window.innerHeight * 3),
                anticipatePin: true,
                // end: 'bottom+=-40 center+=-16',
                scrub: true,
                pinSpacing: 'margin',
                pin: this.ref.current.querySelector('.chapter-deck'),
                refreshPriority: 0,
            }
        });

        gsap.utils
            .toArray(this.ref.current.querySelectorAll('.chapter-description-wrapper'))
            .forEach((el, i) => {
                this.timeline.fromTo(
                    el,
                    { alpha: 0, y: i === 0 ? 0 : 128 },
                    {
                        alpha: 1,
                        y: 0,
                        onReverseComplete: () => {
                            if (this.props.onDescriptionEnter) {
                                this.props.onDescriptionEnter(i);
                            }
                        },
                        onComplete: () => {
                            if (this.props.onDescriptionEnter) {
                                this.props.onDescriptionEnter(i);
                            }
                        },
                    });
                this.timeline.to(el, { alpha: 0 });
            });
    }

    setViewState = (p) => {
        this.setState({viewState: p});
    };

    handleToggleMapInteraction = () => {
        const interactiveMap = !this.state.interactiveMap;
        this.setState({ interactiveMap });

    };

    handleOpenPhotoSlider = () => {
        this.setState({ photoSliderOpen: true });
    };

    handleClosePhotoSlider = () => {
        this.setState({ photoSliderOpen: false });
    };

    render() {
        let { viewState } = this.state;
        let { font, client, chapter, refetch, width, trip, card, updateSlideCamera, gps_data } = this.props;
       // console.log(viewState);
        return (
            <>
                <div ref={this.ref} className="chapter">
                    <div className="chapter-deck">
                        <div className="chapter-btn">
                            <Tooltip placement="top" title="Add page" >
                                <IconButton 
                                    variant="outlined" 
                                    size="small"
                                    color="primary"
                                    onClick={() => this.setState({ addPageDialogOpen: true })}
                                >
                                    <PostAddIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip placement="top" title={`${this.state.interactiveMap ? 'Enabled' : 'Disabled'} the map`}>
                                <IconButton
                                    color={this.state.interactiveMap ? 'primary' : 'default'}
                                    size="small"
                                    onClick={this.handleToggleMapInteraction}
                                >
                                    <PublicOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip placement="top" title="Add photo">
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={this.handleOpenPhotoSlider}
                                >
                                    <AddCircleOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>

                        </div>

                        <div style={{ zIndex: this.state.interactiveMap ? 9 : 0 }}>
                            <Deck
                                chapter={chapter}
                                client={client}
                                refetch={refetch}
                                updateSlideCamera={updateSlideCamera}
                                font={font}
                                viewState={viewState}
                                setViewState={this.setViewState}
                                width={width}
                                trip={trip}
                                gps_data={gps_data}
                                card={card}
                                chapterDataSet={this.props.chapterDataSet}
                            />
                        </div>


                        <div className="chapter-descriptions" style={{ pointerEvents: this.state.interactiveMap ? 'none' : 'auto'}}>
                            {chapter.pages.map((p, i) =>  <div className="chapter-description-wrapper" key={i}>
                                <DescriptionPage page={p} refetch={refetch} />
                                {/* <h6> {p.id} {p.text}</h6>

                                <div className="chapter-btn">
                                    <Tooltip placement="top" title="Delete photo">
                                        <DeletePage
                                            refetch={refetch}
                                            pageId={p.id}
                                        />
                                    </Tooltip>
                                </div> */}

                            </div>)}

                        </div>
                    </div>

                </div>

                <PhotoSelectSideBar
                    viewState={viewState}
                    open={this.state.photoSliderOpen}
                    onClose={this.handleClosePhotoSlider}
                />

                {this.state.addPageDialogOpen && (
                    <AddPage
                        refetch={refetch}
                        chapterId={chapter.id}
                        viewState={viewState}
                        chapterDataSet={this.props.chapterDataSet}
                        onClose={() => this.setState({ addPageDialogOpen: false })}
                    />
                )}
            </>
        );

    }


}
