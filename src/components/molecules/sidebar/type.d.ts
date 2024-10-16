type SubMenu = {
	label: string;
	href: string;
};

export interface MenuItem {
	label: string;
	href?: string;
	subMenu?: SubMenu[];
}
