// scripts/validate-data.js — データ整合性チェック
import { execSync } from 'node:child_process';

console.log('--- Data Integrity Validation (butsuzo-guide) ---');

// TypeScript の型チェックで data/ 層の整合性を確認する（tsc -b が strict モードで実行）
try {
  execSync('npx tsc -b --noEmit', { stdio: 'inherit' });
  console.log('✅ All checks passed! The data is clean.');
} catch {
  console.error('❌ Data validation failed (see tsc output above).');
  process.exit(1);
}
