import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ItemsList, { setStyle } from './items-list';

/* for stateless component */
class Wrapper extends React.Component {
  render() {
    return this.props.children
  }
}

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
    const data = [
      {"id":16,"name":"Konklux","avatar":"https://"},
      {"id":17,"name":"Tresom","avatar":"https://"},
      {"id":18,"name":"Matsoft","avatar":"https://"},
      {"id":19,"name":"Kanlam","avatar":"https://"}
    ];

    const itemsList = TestUtils.renderIntoDocument(
      <Wrapper>
        <ItemsList items={data} />
      </Wrapper>
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(itemsList, 'avatar');
    expect(divs.length).toEqual(4);
  })

});
