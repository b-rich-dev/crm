# Firebase Setup

## Environment Configuration

1. Copy the template files:
   ```bash
   cp src/environments/environment.template.ts src/environments/environment.ts
   cp src/environments/environment.prod.template.ts src/environments/environment.prod.ts
   ```

2. Replace the Firebase configuration in both files with your actual Firebase project settings from:
   - Firebase Console → Project Settings → General → Your apps → Firebase SDK snippet

3. The actual environment files are ignored by git for security reasons.

## Firebase Config Location
- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`