'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
  .post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    // ตรวจสอบว่าข้อมูลทั้งหมดถูกส่งมาหรือไม่
    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required field(s) missing' });
    }

    // ตรวจสอบความยาวของ puzzle
    if (puzzle.length !== 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' });
    }

    // ตรวจสอบว่ามีตัวอักษรที่ไม่ถูกต้องหรือไม่
    if (/[^1-9\.]/.test(puzzle)) {
      return res.json({ error: 'Invalid characters in puzzle' });
    }

    // แยกแถวและคอลัมน์ออกจาก coordinate
    const row = coordinate.charAt(0).toUpperCase().charCodeAt(0) - 65;
    const column = parseInt(coordinate.charAt(1)) - 1;

    if (row < 0 || row > 8 || column < 0 || column > 8) {
      return res.json({ error: 'Invalid coordinate' });
    }

    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: 'Invalid value' });
    }

    const conflicts = []
    
    if (!solver.checkRowPlacement(puzzle, row, column, value)) conflicts.push('row');
    if (!solver.checkColPlacement(puzzle, row, column, value)) conflicts.push('column');
    if (!solver.checkRegionPlacement(puzzle, row, column, value)) conflicts.push('region');

    if (conflicts.length > 0) {
      return res.json({ valid: false, conflict: conflicts });
    } else {
      return res.json({ valid: true, conflict: [] });
    }
  });




  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      if (!puzzle) {
        return res.status(200).json({ error: 'Required field missing' });
      }

      // ตรวจสอบว่า puzzle มีความยาว 81 ตัวอักษร
      if (puzzle.length !== 81) {
        return res.status(200).json({ error: 'Expected puzzle to be 81 characters long' });
      }

      // ตรวจสอบว่า puzzle มีตัวอักษรที่ถูกต้อง
      if (/[^1-9\.]/.test(puzzle)) {
        return res.status(200).json({ error: 'Invalid characters in puzzle' });
      }

      const solution = solver.solve(puzzle);

      if (solution.success) {
        return res.status(200).json({ solution: solution.solution });
      } else {
        return res.status(200).json({ error: 'Puzzle cannot be solved' });
      }
    });
};
