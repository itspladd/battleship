class Board {

  /**
   * The Board class contains all data about the game board itself.
   * This primarily means that it tracks all Tile objects that make up the board.
   * It also is capable of mutating the board to add additionalTiles
   * and adding Markers, which exist on top of Tiles.
   */
  constructor (boardType) {
    // Tiles is an array of arrays.
    this.tiles = this.assembleBoard(boardType);

  }

  assembleBoard(boardType) {
    const tiles = [];
    const width = boardType.dimensions[0];
    const height = boardType.dimensions[1];
    for (let i = 0; i < width; i++) {
      const row = [];
      for (let j = 0; j < height; j++) {
        row.push(`${i}, ${j}`);
      }
      tiles.push(row);
    }
    return tiles;
  }
}

module.exports = Board;