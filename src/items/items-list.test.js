import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import ItemsList, { setStyle } from './items-list';

class Wrapper extends React.Component {
  render() {
    return this.props.children
  }
}

const data = [
  {"id":16,"name":"Konklux","avatar":"https://"},
  {"id":17,"name":"Tresom","avatar":"https://"},
  {"id":18,"name":"Matsoft","avatar":"https://"},
  {"id":19,"name":"Kanlam","avatar":"https://"}
];

describe('items-list', () => {

  it('returns style declaration block with proper text', () => {
    expect(
      setStyle('Opus')
    ).toEqual(
      {
        width: '150px',
        height: '150px',
        position: 'absolute',
        opacity: '.3',
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' height=\'30px\' width=\'56px\'><text x=\'4\' y=\'20\' fill=\'gray\' font-family=\'monospace\' font-size=\'20px\'>Opus</text></svg>")'
      }
    );
  });

  it('renders correct number of items', () => {
    const itemsList = TestUtils.renderIntoDocument(
      <Wrapper>
        <ItemsList items={data} />
      </Wrapper>
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithClass(itemsList, 'avatar');
    expect(divs.length).toEqual(4);
  });

  it('toggles between displaying and hiding the details', () => {
    const div = document.createElement('div');
    document.documentElement.appendChild(div);
    ReactDOM.render(<ItemsList items={data} />, div);

    const imgs = document.documentElement.getElementsByTagName('img');
    const detailsBefore = document.documentElement.getElementsByClassName('item-details');
    const detailsDisplay = detailsBefore[0].style.display;
    expect(detailsDisplay).toBe('');

    TestUtils.Simulate.click(imgs[0]);
    const detailsOne = document.documentElement.getElementsByClassName('item-details');
    const detailsDisplayOne = detailsOne[0].style.display;
    expect(detailsDisplayOne).toBe('block');

    TestUtils.Simulate.click(imgs[0]);
    const detailsTwo = document.documentElement.getElementsByClassName('item-details');
    const detailsDisplayTwo = detailsTwo[0].style.display;
    expect(detailsDisplayTwo).toBe('none');
  });

});
