const mockData_CMS_DONKI = [
  {
    activityID: '2023-12-17T01:36:00-CME-001',
    catalog: 'M2M_CATALOG',
    startTime: '2023-12-17T01:36Z',
    sourceLocation: 'N45W50',
    activeRegionNum: null,
    link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CME/28224/-1',
    note: 'Visible in the NW of SOHO LASCO C2/C3 and STEREO A COR2. The potential source can be seen around N45W50 in SDO AIA 94 around 2023-12-17T03:00Z and is characterized as brightening. Rising loops and opening field lines are also seen in SDO AIA 171 starting around 2023-12-17T18:55Z. Dimming visible in SDO AIA 193. This source in SDO AIA imagery is faint, and it is possible the CME is farsided. The eruption is also visible in the NW in STEREO A 195.',
    instruments: [
      {
        displayName: 'SOHO: LASCO/C2',
      },
      {
        displayName: 'SOHO: LASCO/C3',
      },
      {
        displayName: 'STEREO A: SECCHI/COR2',
      },
    ],
    cmeAnalyses: [
      {
        time21_5: '2023-12-17T16:00Z',
        latitude: 59.0,
        longitude: 50.0,
        halfAngle: 27.0,
        speed: 293.0,
        type: 'S',
        isMostAccurate: true,
        note: 'Measurement of leading edge based on source location, which also matches the best fit between SOHO LASCO C2/C3 and STEREO A COR2 imagery in the coronagraphs.',
        levelOfData: 0,
        link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CMEAnalysis/28225/-1',
        enlilList: null,
      },
    ],
    linkedEvents: null,
  },
  {
    activityID: '2023-12-17T03:12:00-CME-001',
    catalog: 'M2M_CATALOG',
    startTime: '2023-12-17T03:12Z',
    sourceLocation: '',
    activeRegionNum: null,
    link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CME/28230/-1',
    note: 'Faint CME visible in the SE of SOHO LASCO C2/C3 and STEREO A COR2. The source is unclear, and may be a rising loop seen beyond the southeast limb in SDO AIA 171 around 2023-12-17T01:29Z.',
    instruments: [
      {
        displayName: 'SOHO: LASCO/C2',
      },
      {
        displayName: 'SOHO: LASCO/C3',
      },
      {
        displayName: 'STEREO A: SECCHI/COR2',
      },
    ],
    cmeAnalyses: [
      {
        time21_5: '2023-12-17T14:16Z',
        latitude: -50.0,
        longitude: null,
        halfAngle: 24.0,
        speed: 319.0,
        type: 'S',
        isMostAccurate: true,
        note: 'Plane of sky measurement. The longitude could not be obtained because a source was not visible on the disk in EUV imagery and a best fit could not be reliably obtained using the best fit between SOHO LASCO C2/C3 and STEREO A COR2 imagery in SWPC_CAT.',
        levelOfData: 0,
        link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CMEAnalysis/28231/-1',
        enlilList: null,
      },
    ],
    linkedEvents: null,
  },
  {
    activityID: '2023-12-17T04:12:00-CME-001',
    catalog: 'M2M_CATALOG',
    startTime: '2023-12-17T04:12Z',
    sourceLocation: '',
    activeRegionNum: null,
    link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CME/28228/-1',
    note: 'CME visible in the east in SOHO LASCO C2/C3 and STEREO A COR2. The source is unclear, and may be beyond the east limb in available EUV imagery; any source on or beyond the limb may be obscured by the bright field lines currently on the limb.',
    instruments: [
      {
        displayName: 'SOHO: LASCO/C2',
      },
      {
        displayName: 'SOHO: LASCO/C3',
      },
      {
        displayName: 'STEREO A: SECCHI/COR2',
      },
    ],
    cmeAnalyses: [
      {
        time21_5: '2023-12-17T11:27Z',
        latitude: 4.0,
        longitude: null,
        halfAngle: 28.0,
        speed: 472.0,
        type: 'S',
        isMostAccurate: true,
        note: 'Plane of sky measurement using SOHO LASCO C2/C3 due to lack of coronagraph imagery in SWPC_CAT.',
        levelOfData: 0,
        link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CMEAnalysis/28229/-1',
        enlilList: null,
      },
    ],
    linkedEvents: null,
  },
  {
    activityID: '2023-12-17T05:36:00-CME-001',
    catalog: 'M2M_CATALOG',
    startTime: '2023-12-17T05:36Z',
    sourceLocation: 'N05W90',
    activeRegionNum: 13514,
    link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CME/28232/-1',
    note: 'Faint CME visible to the west of SOHO LASCO C2/C3 and STEREO A COR2. The potential source may be a small eruption from the vicinity of AR 3514 (approx. N05W85) on the west limb with opening field lines and ejecta visible around 2023-12-17T01:48Z in SDO AIA 171/193. The eruption is also visible near the west limb in STEREO A EUV 195.',
    instruments: [
      {
        displayName: 'SOHO: LASCO/C2',
      },
      {
        displayName: 'SOHO: LASCO/C3',
      },
      {
        displayName: 'STEREO A: SECCHI/COR2',
      },
    ],
    cmeAnalyses: [
      {
        time21_5: '2023-12-17T20:47Z',
        latitude: -13.0,
        longitude: 85.0,
        halfAngle: 20.0,
        speed: 241.0,
        type: 'S',
        isMostAccurate: true,
        note: "This measurement primarily uses SOHO LASCO C2/C3 imagery. Only one frame was available in STEREO A COR2 due to the CME's faintness. This measurement uses the approximate source location for the longitude.",
        levelOfData: 0,
        link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CMEAnalysis/28233/-1',
        enlilList: null,
      },
    ],
    linkedEvents: null,
  },
  {
    activityID: '2023-12-17T18:12:00-CME-001',
    catalog: 'M2M_CATALOG',
    startTime: '2023-12-17T18:12Z',
    sourceLocation: '',
    activeRegionNum: null,
    link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CME/28244/-1',
    note: 'Faint, loop-like CME visible in the N/NW of SOHO LASCO C2/C3 and STEREO A COR2. The source is not visible in available EUV imagery, but faint moving field lines can be seen on the limb in SDO AIA 171 starting around 2023-12-17T18:00Z. This CME is likely backsided.',
    instruments: [
      {
        displayName: 'SOHO: LASCO/C2',
      },
      {
        displayName: 'SOHO: LASCO/C3',
      },
      {
        displayName: 'STEREO A: SECCHI/COR2',
      },
    ],
    cmeAnalyses: [
      {
        time21_5: '2023-12-18T01:22Z',
        latitude: 71.0,
        longitude: null,
        halfAngle: 28.0,
        speed: 558.0,
        type: 'C',
        isMostAccurate: true,
        note: 'Plane of sky measurement due to lack of source location.',
        levelOfData: 0,
        link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CMEAnalysis/28245/-1',
        enlilList: null,
      },
    ],
    linkedEvents: null,
  },
];

export default mockData_CMS_DONKI;
