export const tagCateOptions = [
  { label: '人物', value: TagCateEnum.CHARACTER },
  { label: '路人', value: TagCateEnum.CREW },
  { label: '虚拟人物', value: TagCateEnum.VIRTUAL },
  { label: '拍摄文件', value: TagCateEnum.CAMERA_FILE },
  { label: 'FAKE 文件', value: TagCateEnum.FAKE_FILE },
  { label: '自上传文件', value: TagCateEnum.SELF_FILE },
];

export const characterTagOptions = [
  { label: '评价', value: TagSliceEnum.JUDGE },
  { label: '情感', value: TagSliceEnum.EMOTION },
  { label: '行为', value: TagSliceEnum.BEHAVIOR },
  { label: '身体状态', value: TagSliceEnum.STATUS },
  { label: '长相', value: TagSliceEnum.APPEARANCE },
  { label: '身体部位', value: TagSliceEnum.BODY_PART },
  { label: '年龄段', value: TagSliceEnum.AGE },
  { label: '身份/职位', value: TagSliceEnum.IDENTITY },
  { label: '关系', value: TagSliceEnum.RELATION },
  { label: '其他', value: TagSliceEnum.OTHER },
];

export const crewTagOptions = [
  { label: '长相', value: TagSliceEnum.C_APPEARANCE },
  { label: '臀型', value: TagSliceEnum.C_CONTOUR },
  { label: '身体部位', value: TagSliceEnum.C_BODY_PART },
  { label: '体型', value: TagSliceEnum.C_STATUS },
  { label: '碰面次数', value: TagSliceEnum.MEETING },
  { label: '其他', value: TagSliceEnum.C_OTHER },
];

export const virtualTagOptions = [
  { label: '其他', value: TagSliceEnum.V_OTHER },
];

export const selfFileTagOptions = [
  { label: '其他', value: TagSliceEnum.S_OTHER },
];

export const cameraFileTagOptions = [
  { label: '臀型', value: TagSliceEnum.CONTOUR },
  { label: '穿着', value: TagSliceEnum.OUTFIT },
  { label: '距离', value: TagSliceEnum.DISTANCE },
  { label: '拍摄角度', value: TagSliceEnum.DIRECTION },
  { label: '身体姿态', value: TagSliceEnum.POSITION },
  { label: '身体动作', value: TagSliceEnum.MOTION },
  { label: '身体部位', value: TagSliceEnum.R_BODY_PART },
  { label: '衣物状态', value: TagSliceEnum.TEXTURE },
  { label: '反应', value: TagSliceEnum.REACTION },
  { label: '长相', value: TagSliceEnum.R_APPEARANCE },
  { label: '年龄段', value: TagSliceEnum.R_AGE },
  { label: '遮挡情况', value: TagSliceEnum.OCCLUSION },
  { label: '时长', value: TagSliceEnum.DURATION },
  { label: '多人', value: TagSliceEnum.MULTI },
  { label: '其他', value: TagSliceEnum.R_OTHER },
];

export const fakeFileTagOptions = [
  { label: '其他', value: TagSliceEnum.F_OTHER },
];

export const tagTierColorOptions = [
  { value: TierEnum.T0, color: 'magenta' },
  { value: TierEnum.T1, color: 'error' },
  { value: TierEnum.T2, color: 'warning' },
  { value: TierEnum.T3, color: 'success' },
  { value: TierEnum.T4, color: 'cyan' },
  { value: TierEnum.T5, color: 'processing' },
];
