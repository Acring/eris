import uiPackage from '@xsky/eris-ui/package.json';
import uiPresetPackage from '@xsky/eris-ui-preset/package.json';
import iconsPackage from '@xsky/eris-icons/package.json';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    ui: uiPackage.version,
    uiPreset: uiPresetPackage.version,
    icons: iconsPackage.version,
  });
}
