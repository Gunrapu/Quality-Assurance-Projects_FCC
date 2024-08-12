class SudokuSolver {

  // ตรวจสอบว่า puzzleString นั้นถูกต้องหรือไม่
  validate(puzzleString) {
    // ตรวจสอบว่ามีตัวอักษรที่ไม่ใช่ 1-9 หรือ . หรือไม่
    if (/[^1-9.]/.test(puzzleString)) {
        return { valid: false, error: 'Invalid characters in puzzle.' };
    }

    // ตรวจสอบความยาวของสตริง (ควรจะเป็น 81 ตัวอักษร)
    if (puzzleString.length !== 81) {
        return { valid: false, error: 'Expected puzzle to be 81 characters long.' };
    }

    return { valid: true };
  }


  // ตรวจสอบว่าการวางค่าในแถวถูกต้องหรือไม่
  checkRowPlacement(puzzleString, row, column, value) {
    // คำนวณดัชนีเริ่มต้นของแถว
    const start = row * 9;
    for (let i = 0; i < 9; i++) {
      if (puzzleString[start + i] === value && i !== column) {
        return false;
      }
    }
    return true;
  }

  // ตรวจสอบว่าการวางค่าในคอลัมน์ถูกต้องหรือไม่
  checkColPlacement(puzzleString, row, column, value) {
    // คำนวณตำแหน่งในสตริงของซูโดกุ
    const index = row * 9 + column;

    // ตรวจสอบว่า value เป็นตัวเลขระหว่าง 1-9
    if (!/^[1-9]$/.test(value)) {
      return false;
    }

    // ตรวจสอบว่า value ถูกวางอยู่แล้วในตำแหน่งที่กำหนดหรือไม่
    if (puzzleString[index] === value) {
      return true;
    }

    // ตรวจสอบคอลัมน์ที่กำหนด
    for (let r = 0; r < 9; r++) {
      if (r !== row && puzzleString[r * 9 + column] === value) {
        return false; // พบค่าซ้ำในคอลัมน์
      }
    }

    return true; // สามารถวางค่าได้
  }

  // ตรวจสอบว่าการวางค่าใน region (3x3) ถูกต้องหรือไม่
  checkRegionPlacement(puzzleString, row, column, value) {
    const regionRowStart = Math.floor(row / 3) * 3;
    const regionColStart = Math.floor(column / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const currentRow = regionRowStart + r;
        const currentCol = regionColStart + c;
        const currentIndex = currentRow * 9 + currentCol;
        if (puzzleString[currentIndex] === value && (currentRow !== row || currentCol !== column)) {
          return false;
        }
      }
    }
    return true;
  }

  // ฟังก์ชันช่วยเหลือในการค้นหาตำแหน่งว่างใน puzzle
  findEmptyPosition(puzzleArray) {
    for (let i = 0; i < puzzleArray.length; i++) {
      if (puzzleArray[i] === '.') {
        return i;
      }
    }
    return -1; // ไม่มีตำแหน่งว่าง
  }

  // แปลงดัชนีเป็นตำแหน่งแถวและคอลัมน์
  indexToRowCol(index) {
    return {
      row: Math.floor(index / 9),
      column: index % 9
    };
  }

  // แก้ปริศนา Sudoku
  solve(puzzleString) {
    // ตรวจสอบความถูกต้องของซูโดกุก่อน
    const validation = this.validate(puzzleString);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
  
    // แปลง puzzleString เป็น 2D Array
    let board = this.convertToBoard(puzzleString);
  
    // เรียกฟังก์ชัน recursive สำหรับการแก้ปัญหา
    if (this.solveBoard(board)) {
      return { success: true, solution: this.convertToString(board) };
    } else {
      return { success: false, error: 'Puzzle cannot be solved' };
    }
  }
  

  // Helper functions
  convertToBoard(puzzleString) {
    let board = [];
    for (let i = 0; i < 81; i += 9) {
      board.push(puzzleString.slice(i, i + 9).split('').map(x => x === '.' ? null : parseInt(x)));
    }
    return board;
  }

  convertToString(board) {
    return board.flat().map(x => x === null ? '.' : x.toString()).join('');
  }

  solveBoard(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) {
          for (let num = 1; num <= 9; num++) {
            if (this.isValidPlacement(board, row, col, num)) {
              board[row][col] = num;
              if (this.solveBoard(board)) {
                return true;
              }
              board[row][col] = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  isValidPlacement(board, row, col, num) {
    // Check row
    if (board[row].includes(num)) return false;

    // Check column
    if (board.some(r => r[col] === num)) return false;

    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (board[r][c] === num) return false;
      }
    }

    return true;
  }
}

module.exports = SudokuSolver;
