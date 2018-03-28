import { _, Component, FontAwesomeIcon, FontAwesomeSolid, React, styled } from 'appReact';
import { boxShadow, colors, createTransitionForProperties, pxToEm } from 'styles/util';
import { ScrollViews } from 'util/enums/scrollEnums';
import ImagesData from 'data/images.json';

const { faEllipsisV, faEllipsisH, faTh } = FontAwesomeSolid;
const imagesLength = ImagesData.length;

/**
 * An infinite scroll container with a list that will scroll infinitely in either direction. Allows for toggling the
 * list view type between horizontal (default), vertical, and grid.
 *
 * TODO: Add functionality to the scroll fro vertical and grid.
 *
 * @extends Component
 */
class InfiniteScrollContainer extends Component {
  state = {
    currentStartingIndex: 0,
    imageCount: 4,
    selectedView: 'horizontal',
  }

  componentWillMount() {
    this.loadImages();

    setTimeout(() => {
      console.log('timeout');
      this.onViewSelect({ target: { value: 'horizontal' } });
    }, 200);
  }

  /**
   * When the view type is changed / updated update the component state to reflect the necessary changes.
   *
   * @param {object} event DOM event object.
   */
  onViewSelect = (event) => {
    const { value } = event.target;
    const { selectedView } = this.state;
    let { imageCount } = this.state;

    const containerWidth = document.querySelector('.infinite-scroll-list').clientWidth;
    const imageWidth = document.querySelectorAll('.show-image')[0].clientWidth;
    const newImageCount = Math.ceil(containerWidth / imageWidth) - 1;
    console.log(document.querySelector('.infinite-scroll-list'), containerWidth, imageWidth, newImageCount);

    if (!_.isEqual(selectedView, value) || imageCount !== newImageCount) {
      // Set the image count based on the selected view
      switch (selectedView) {
        case ScrollViews.VERTICAL: {
          // imageCount = 3;
          imageCount = imagesLength - 1;
          break;
        }
        case ScrollViews.GRID: {
          // imageCount = 8;
          imageCount = imagesLength - 1;
          break;
        }
        case ScrollViews.HORIZONTAL:
        default: {
          imageCount = newImageCount;
          break;
        }
      }
      console.log(imageCount);

      this.setState({
        imageCount,
        selectedView: value,
      }, this.loadImages);
    }
  }

  /**
   * Load the images to be displayed in the UI. This has catches to update the current number of images loaded as well
   * as to allow for infinite scrolling in either direction.
   *
   * TODO: Add the ability to "pre-load" images to the left or right to enable scrolling type action.
   *
   * @param {number} index A passed starting index, will be default over the current state.
   */
  loadImages = (index) => {
    const { currentStartingIndex, imageCount } = this.state;

    let startingIndex = (!_.isUndefined(index)) ? index : currentStartingIndex;

    // Infinite scroll - loop the index around the available images list length.
    if (startingIndex < 0) {
      startingIndex = imagesLength + startingIndex;
    } else if (startingIndex >= imagesLength) {
      startingIndex -= imagesLength;
    }

    // Min and max values for the range of images to display
    const visibleRange = [startingIndex, startingIndex + imageCount];
    const visibleImages = [];

    // Aggregate the images to display in a list.
    for (let visibleIndex = visibleRange[0]; visibleIndex <= visibleRange[1]; visibleIndex++) {
      let imageIndex = visibleIndex;

      // Ensure that the index being used isn't outside the available images indexes.
      if (imageIndex >= imagesLength) {
        imageIndex -= imagesLength;
      }

      visibleImages.push(ImagesData[imageIndex]);
    }

    this.setState({
      currentStartingIndex: startingIndex,
      visibleImages,
    });
  }

  /**
   * Based on the directional arrow clicked update the starting index for the images in the list.
   *
   * @param {object} event DOM event object.
   */
  scrollImages = (event) => {
    const { dataset: { direction } } = event.target;
    const { currentStartingIndex, imageCount } = this.state;
    let newStartingIndex = currentStartingIndex;

    if (direction === 'next') {
      newStartingIndex += imageCount;
    } else {
      newStartingIndex -= imageCount;
    }

    this.loadImages(newStartingIndex);
  }

  /**
   * TODO: Create separate components for:
   *   - ViewSwitcher
   *   - InfiniteScroll
   */
  render() {
    const { selectedView, visibleImages } = this.state;
    return (
      <InfiniteScrollSection>
        <ViewSwitcher>
          <span>Select View:</span>
          <input
            id={`view-switch--${ScrollViews.HORIZONTAL}`}
            type='radio'
            name='scroll-view-switch'
            onChange={this.onViewSelect}
            value={ScrollViews.HORIZONTAL}
          />
          <label
            className={((selectedView === ScrollViews.HORIZONTAL) && 'active').toString()}
            htmlFor={`view-switch--${ScrollViews.HORIZONTAL}`}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </label>

          <input
            id={`view-switch--${ScrollViews.VERTICAL}`}
            type='radio'
            name='scroll-view-switch'
            onChange={this.onViewSelect}
            value={ScrollViews.VERTICAL}
          />
          <label
            className={((selectedView === ScrollViews.VERTICAL) && 'active').toString()}
            htmlFor={`view-switch--${ScrollViews.VERTICAL}`}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </label>

          <input
            id={`view-switch--${ScrollViews.GRID}`}
            type='radio'
            name='scroll-view-switch'
            onChange={this.onViewSelect}
            value={ScrollViews.GRID}
          />
          <label
            className={((selectedView === ScrollViews.GRID) && 'active').toString()}
            htmlFor={`view-switch--${ScrollViews.GRID}`}
          >
            <FontAwesomeIcon icon={faTh} />
          </label>
        </ViewSwitcher>

        <InfiniteScrollDiv>
          <ScrollButton
            className={`scroll-button--back--${selectedView}`}
            data-direction='back'
            onClick={this.scrollImages}
            type='button'
          >
            &lt;
          </ScrollButton>
          <InfiniteScrollList className={`infinite-scroll-list ${selectedView}`} selectedView={selectedView}>
            {visibleImages.map((imageSrc, imageIndex) => {
              const key = `${imageSrc}-${imageIndex}`;

              return (
                <li key={key}><img className='show-image' src={imageSrc} alt={imageIndex} /></li>
              );
            })}
          </InfiniteScrollList>
          <ScrollButton
            className={`scroll-button--next--${selectedView}`}
            data-direction='next'
            onClick={this.scrollImages}
            type='button'
          >
            &gt;
          </ScrollButton>
        </InfiniteScrollDiv>
      </InfiniteScrollSection>
    );
  }
}

const InfiniteScrollSection = styled.section`
  height: calc(100vh - ${pxToEm(230)});
  overflow: hidden;
  width: 100%;
`;

const ViewSwitcher = styled.header`
  align-content: center;
  align-items: center;
  display: flex;
  padding: ${pxToEm(15)} 3%;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    padding: ${pxToEm(10)};
    margin: ${pxToEm(10)};

    svg {
      height: ${pxToEm(40)} !important;
      width: auto !important;

      * {
        fill: ${colors.white.hex} !important;
      }
    }

    &.active {
      svg * {
        fill: ${colors.red.hex} !important;
      }
    }
  }
`;

const InfiniteScrollDiv = styled.div`
  box-sizing: border-box;
  height: calc(97vh - ${pxToEm(230)});
  padding: 0 3%;
  position: relative;
`;

const ScrollButton = styled.button`
  align-items: center;
  background: ${colors.black.hex};
  border: none;
  box-sizing: border-box;
  color: ${colors.white.hex};
  content: '>';
  display: flex;
  font-size: ${pxToEm(35)};
  font-weight: 700;
  height: ${pxToEm(100)};
  justify-content: center;
  outline: none;
  position: absolute;
  top: ${pxToEm(50)};
  transform-origin: center;
  width: 3%;
  z-index: 5;
  ${createTransitionForProperties(['color'])};

  &.scroll-button--back--horizontal {
    left: 0;
  }

  &.scroll-button--next--horizontal {
    right: 0;
  }

  &.scroll-button--back--vertical,
  &.scroll-button--next--vertical,
  &.scroll-button--back--grid,
  &.scroll-button--next--grid {
    display: none;
    transform: rotate(90deg);
  }

  &.scroll-button--back--vertical,
  &.scroll-button--next--vertical {
    left: ${pxToEm(100)};
  }

  &.scroll-button--back--vertical {
    top: 0;
  }

  &.scroll-button--next--vertical {
    bottom: 0;
  }

  &.scroll-button--back--grid,
  &.scroll-button--next--grid {
    left: 48.5%;
  }

  &.scroll-button--back--grid {
    top: calc(50vh - ${pxToEm(230)});
    left: 0;
  }

  &.scroll-button--next--grid {
    top: calc(50vh - ${pxToEm(230)});
    right: 0;
  }

  &:hover {
    color: ${colors.red.hex};
  }
`;

const InfiniteScrollList = styled.ul`
  box-sizing: border-box;
  display: flex;
  height: calc(97vh - ${pxToEm(230)});
  overflow: hidden;
  position: relative;

  li,
  img {
    height: ${pxToEm(200)};
  }

  img {
    cursor: pointer;
    margin: ${pxToEm(8)} ${pxToEm(16)} ${pxToEm(8)} 0;
    min-height: ${pxToEm(200)};
    ${boxShadow()};
    ${createTransitionForProperties(['height', 'transform', 'width'])};

    &:hover {
      transform: scale(1.1);
    }
  }

  &.horizontal li:first-child img {
    transform-origin: center left;
  }

  &.vertical {
    flex-direction: column;
    overflow-y: scroll;
  }

  &.grid {
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: scroll;

    &:after {
      content: "";
      flex: auto;
    }

    img {
      height: auto;
      width: calc(${(1 / 3 * 94)}% - ${pxToEm(30)});
    }

    li {
      &:nth-child(3n+1) img {
        transform-origin: center left;
      }

      &:nth-child(3n+2) img {
        transform-origin: center;
      }

      &:nth-child(3n+3) img {
        transform-origin: center right;
      }
    }
  }
`;

export default InfiniteScrollContainer;