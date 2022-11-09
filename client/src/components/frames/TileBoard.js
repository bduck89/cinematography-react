import "../../css/frames/work/tileboard.css";
import React from "react";
import Tile from "./Tile";

class TileBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [],
    };
  }

  componentDidMount() {
    this.setState({
      tiles: this.props.allTiles,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        tiles: this.props.allTiles,
      });
    }
  }

  organiseTileRows(tiles) {
    const mains = [];
    const upperRight = [];
    const lowerRight = [];
    const tileRows = [];
    const tileArray = tiles;

    if (this.state.tiles.length !== 0) {
      tileArray.forEach((tile, index) => {
        if (index % 3 === 0) {
          mains.push(tile);
        } else if ((index - 1) % 3 === 0) {
          upperRight.push(tile);
        } else if ((index - 2) % 3 === 0) {
          lowerRight.push(tile);
        }
      });

      for (let i = 0; i < mains.length; i++) {
        const rowObject = {
          main: {},
          upperRight: {},
          lowerRight: {},
        };

        rowObject.main = mains[i];
        rowObject.upperRight = upperRight[i];
        rowObject.lowerRight = lowerRight[i];

        tileRows.push(rowObject);
      }
    }
    return tileRows;
  }

  renderRows() {
    const rows = this.organiseTileRows(this.state.tiles);

    if (rows) {
      return rows.map((row, index) => {
        if (row.main && row.lowerRight && row.upperRight) {
          return (
            <div key={index} className="tile-row">
              <div className="main-tile-wrapper">
                <div className="main-tile">
                  <Tile
                    backgroundImage={row.main.thumbnail}
                    videoTitle={row.main.videoTitle}
                    videoId={row.main._id}
                    tileStyle={`${this.props.rowStyle}-main-tile`}
                    isLink={this.props.isLink}
                  />
                </div>
              </div>
              <div className="right-tiles">
                <div className="right-tile-upper">
                  <Tile
                    backgroundImage={row.upperRight.thumbnail}
                    videoTitle={row.upperRight.videoTitle}
                    videoId={row.upperRight._id}
                    tileStyle={`${this.props.rowStyle}-upper-tile`}
                    isLink={this.props.isLink}
                  />
                </div>
                <div className="right-tile-lower">
                  <Tile
                    backgroundImage={row.lowerRight.thumbnail}
                    videoTitle={row.lowerRight.videoTitle}
                    videoId={row.lowerRight._id}
                    tileStyle={`${this.props.rowStyle}-lower-tile`}
                    isLink={this.props.isLink}
                  />
                </div>
              </div>
            </div>
          );
        }
      });
    }
  }

  render() {
    return <div className="tileboard-work">{this.renderRows()}</div>;
  }
}

export default TileBoard;
