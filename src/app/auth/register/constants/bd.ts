import bdPostalCodes from '../../../../../bd_postal_codes.json';
import type { BDJSON, PSInfo } from '../types';

const BD: BDJSON = bdPostalCodes as BDJSON;

export const DIVISION_LIST: string[] = [
  ...BD.bangladesh.divisions.map((d) => d.name),
].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

export const DISTRICTS_BY_DIVISION_MAP: Record<string, string[]> =
  Object.fromEntries(
    BD.bangladesh.divisions.map((div) => [
      div.name,
      [...div.districts.map((d) => d.name)].sort((a, b) =>
        a.localeCompare(b, 'en', { sensitivity: 'base' }),
      ),
    ]),
  );

export const PS_BY_DISTRICT_MAP: Record<string, PSInfo[]> = Object.fromEntries(
  BD.bangladesh.divisions.flatMap((div) =>
    div.districts.map((d) => [
      d.name,
      [
        ...d.police_stations.map((ps) => ({
          name: ps.name,
          postalCode: ps.postal_code,
        })),
      ].sort((a, b) =>
        a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
      ),
    ]),
  ),
);
