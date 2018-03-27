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
            <span className='fas fa-th' />
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
  width: 100vw;

  img {
    min-height: ${pxToEm(250)};
    margin: ${pxToEm(14)};
    ${boxShadow()};
  }

  &.horizontal {
    overflow-x: scroll;
  }

  &.vertical {
    flex-direction: column;
  }

  &.grid {
    flex-wrap: wrap;
    justify-content: space-around;

    &:after {
      content: "";
      flex: auto;
    }

    img {
      width: calc(33.3333vw - ${pxToEm(40)});
    }
  }
`;

export default InfiniteScrollContainer;