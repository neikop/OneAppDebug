class MapA extends Map {
    constructor() {
        var arrayMap = [
            [31, 16, 15, 96, 17, 16, 16, 16, 16, 16, 16, 15, 96, 17, 16, 32],
            [14, 51, 41, 66, 51, 51, 44, 51, 51, 43, 51, 41, 66, 51, 51, 18],
            [14, 44, 51, 66, 43, 51, 51, 91, 51, 51, 51, 51, 66, 51, 44, 18],
            [14, 42, 11, 76, 13, 51, 61, 65, 65, 62, 44, 51, 66, 92, 51, 18],
            [14, 51, 17, 76, 15, 51, 66, 51, 44, 66, 51, 95, 66, 51, 51, 18],
            [14, 95, 51, 66, 51, 44, 66, 51, 51, 66, 51, 42, 66, 51, 41, 18],
            [14, 44, 51, 64, 65, 65, 67, 65, 65, 63, 43, 51, 66, 93, 51, 18],
            [14, 51, 51, 92, 41, 51, 66, 43, 51, 41, 11, 12, 76, 12, 12, 33],
            [14, 51, 81, 51, 51, 51, 66, 42, 51, 51, 18, 22, 76, 21, 23, 21],
            [14, 82, 83, 84, 51, 43, 66, 51, 91, 51, 17, 16, 76, 16, 16, 32],
            [14, 44, 51, 61, 65, 65, 67, 65, 65, 62, 51, 51, 66, 41, 51, 18],
            [14, 42, 51, 66, 11, 13, 66, 94, 51, 66, 42, 51, 66, 51, 43, 18],
            [14, 51, 94, 66, 17, 15, 66, 51, 42, 66, 51, 44, 66, 51, 51, 18],
            [14, 51, 51, 64, 65, 65, 63, 51, 44, 64, 65, 65, 63, 93, 51, 18],
            [14, 43, 51, 42, 51, 51, 44, 51, 51, 51, 41, 51, 41, 51, 44, 18],
            [34, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 33]
        ];
        var arrayPoint = [];
        arrayPoint.push([
            new Phaser.Point(2 + 1, 0 + 1),
            new Phaser.Point(2 + 1, 5 + 1),
            new Phaser.Point(8 + 1, 5 + 1),
            new Phaser.Point(8 + 1, 2 + 1),
            new Phaser.Point(5 + 1, 2 + 1),
            new Phaser.Point(5 + 1, 12 + 1),
            new Phaser.Point(2 + 1, 12 + 1),
            new Phaser.Point(2 + 1, 9 + 1),
            new Phaser.Point(8 + 1, 9 + 1),
            new Phaser.Point(8 + 1, 12 + 1),
            new Phaser.Point(11 + 1, 12 + 1),
            new Phaser.Point(11 + 1, 0 + 1)
        ]);
        super(arrayMap, arrayPoint);
    }
}
