import { _, Component, React, styled } from 'appReact';
import { boxShadow, colors, createTransitionForProperties, pxToEm } from 'styles/util';
import { ScrollViews } from 'util/enums/scrollEnums';
import ImagesData from 'data/images.json';

class InfiniteScrollContainer extends Component {
  state = {
    selectedView: 'horizontal',
  }

  onViewSelect = (event) => {
    const { value } = event.target;
    const { selectedView } = this.state;

    if (!_.isEqual(selectedView, value)) {
      this.setState({
        selectedView: value,
      });
    }
  }

  render() {
    const { selectedView } = this.state;
    return (
      <section>
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
            <span className='fas fa-ellipsis-h' />
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
            <span className='fas fa-ellipsis-v' />
          </label>
        </ViewSwitcher>

        <InfiniteScrollList className={selectedView} selectedView={selectedView}>
          {ImagesData.map((imageSrc, imageIndex) => {
            const key = `${imageSrc}-${imageIndex}`;

            return (
              <li key={key}><img src={imageSrc} alt={imageIndex} /></li>
            );
          })}
        </InfiniteScrollList>
      </section>
    );
  }
}

const ViewSwitcher = styled.header`
  align-content: center;
  align-items: center;
  display: flex;
  padding: ${pxToEm(15)};

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
    }

    &.active {
      svg * {
        fill: ${colors.red.hex} !important;
      }
    }
  }
`;

const InfiniteScrollList = styled.ul`
  align-items: center;
  align-content: center;
  display: flex;
  overflow-x: scroll;
  width: 100vw;

  &.vertical {
    flex-direction: column;
  }

  li img {
    min-height: ${pxToEm(250)};
    margin: 0 ${pxToEm(20)};
    ${boxShadow()};
  }
`;

export default InfiniteScrollContainer;