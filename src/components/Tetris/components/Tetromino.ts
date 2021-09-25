export const Tshape = [
	[1, 0],
	[0, 1],
	[1, 1],
	[1, 2],
];
export const Oshape = [
	[0, 0],
	[0, 1],
	[1, 0],
	[1, 1],
];
export const Lshape = [
	[1, 0],
	[1, 1],
	[1, 2],
	[0, 2],
];
export const Jshape = [
	[1, 0],
	[1, 1],
	[1, 2],
	[0, 0],
];
export const Zshape = [
	[0, 0],
	[0, 1],
	[1, 1],
	[1, 2],
];
export const Sshape = [
	[0, 1],
	[1, 0],
	[1, 1],
	[0, 2],
];
export const Ishape = [
	[0, 1],
	[0, 0],
	[0, 2],
	[0, 3],
];

const tetrominos = [{ shape: Tshape, color: '#a8e6cf', shapeCode: 'T' }, { shape: Oshape, color: '#dcedc1', shapeCode: 'O' }, { shape: Lshape, color: '#ffd3b6', shapeCode: 'L' }, { shape: Jshape, color: '#ffaaa5', shapeCode: 'J' }, { shape: Zshape, color: '#ff8b94', shapeCode: "Z" }, { shape: Ishape, color: '#ff9f43', shapeCode: 'I' }, { shape: Sshape, color: '#00aedb', shapeCode: 'S' }];

// create a random tetromino
export const createTetromino = () => {
	// randomised which tetromino to put in
	let num = Math.floor(Math.random() * 7);
	return tetrominos[num];
};
