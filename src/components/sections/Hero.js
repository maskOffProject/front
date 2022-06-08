import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import ImageDragDrop from '../image/DropZone/DragDrop';
import VideoDragDrop from '../video/DropZone/DragDrop';
import { AppBar, Tab, Tabs } from 'material-ui';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const imageTabKey = 'image-tab';
  const videoTabKey = 'video-tab';

  const [videoModalActive, setVideomodalactive] = useState(false);
  const [tab, setTab] = useState(imageTabKey);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              <span className="text-color-primary">MaskOFF</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Remove the masks from your favorites photos!<br></br>
                start <span className="text-color-primary">NOW</span>
                </p>
            </div>
          </div>
          <div className='center'>
              <Tabs
                value={tab}
                onChange={(value) => setTab(value)}
                variant="scrollable"
                scrollButtons="off"
                aria-label="scrollable prevent tabs example"
              >
                <Tab label='Image' value={imageTabKey} />
                <Tab label='video' value={videoTabKey} />
              </Tabs>
              <TabPanel value={imageTabKey}><ImageDragDrop/></TabPanel>
              <TabPanel value={videoTabKey}><VideoDragDrop/></TabPanel>
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;