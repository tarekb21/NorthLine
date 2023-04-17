import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <footer>
          <div className="container">
            <div className="row">
              <div className="columns twelve">
                <ul>
                  <li>Made by Carl Bednorz | FRNKN</li>
                  <li>Follow me via <a href="https://www.github.com/frnkn">Github</a> or <a href="https://www.twitter.com/frankenapps">Twitter</a></li>
                </ul>
                <ul>
                  <li><a rel="index nofollow" href="/imprint/">Imprint/Legal</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}