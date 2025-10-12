export type FunctionComponent = React.ReactElement | null;

type HeroIconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
	React.RefAttributes<SVGSVGElement>;
type IconProps = HeroIconSVGProps & {
	title?: string;
	titleId?: string;
};

export interface Post {
  id: string;
  title: string;
  content: string; // чтобы Form и EditPost работали
};

export type Heroicon = React.FC<IconProps>;
