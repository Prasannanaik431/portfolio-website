export interface ImpactStat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  detail?: string;
  decimals?: number;
  /** Override numeric display (e.g. role title) */
  displayText?: string;
  /** Skip counter animation — render value as-is */
  static?: boolean;
}

export const IMPACT_STATS: ImpactStat[] = [
  {
    id: "environments",
    value: 35,
    suffix: "+",
    label: "Production Environments",
    detail: "AWS EKS · Azure AKS across multi-tenant fleet",
  },
  {
    id: "deploy-speed",
    value: 95,
    suffix: "%",
    label: "Deploy Time Reduction",
    detail: "GitOps workflows & shared CI/CD libraries",
  },
  {
    id: "automation",
    value: 99,
    suffix: "%",
    label: "Manual Config Eliminated",
    detail: "Helm framework & Kyverno policy-as-code",
  },
  {
    id: "pipelines",
    value: 100,
    suffix: "+",
    label: "CI/CD Pipelines Automated",
    detail: "Jenkins Groovy shared library framework",
  },
  {
    id: "disciplines",
    displayText: "Platform",
    label: "Engineer",
    detail: "AWS EKS primary · Azure AKS secondary",
    static: true,
    value: 0,
  },
  {
    id: "uptime",
    value: 99.999,
    suffix: "%",
    label: "Uptime SLO Maintained",
    detail: "SLO-driven reliability in production",
    decimals: 3,
    static: true,
  },
];

export const IMPACT_YAML = `impact:
  environments: 35+ production envs managed
  deploy_speed: 95% reduction in deploy time
  automation: 99% manual config eliminated
  pipelines: 100+ CI/CD pipelines automated
  disciplines: Platform Engineer (AWS EKS · Azure AKS)
  uptime: 99.999% SLO maintained`;
