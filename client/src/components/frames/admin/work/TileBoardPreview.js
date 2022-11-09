import React from "react";
import TileBoard from "../../TileBoard";

class TileBoardPreview extends React.Component {
  renderTileBoard() {
    if (this.props.list) {
      return (
        <div className="tileboard-div">
          <h3>Tileboard Preview</h3>
          <div className="tileboard-preview">
            <TileBoard allTiles={this.props.list} rowStyle="preview" />
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderTileBoard()}</div>;
  }
}

export default TileBoardPreview;
