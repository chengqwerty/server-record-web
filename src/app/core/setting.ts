export interface AppSettings {
    theme: string;
    headerPosition: string;
    showHeader: boolean;
    showSidenav: boolean;
}

export const defaults: AppSettings = {
    theme: 'red',
    headerPosition: 'above',
    showHeader: true,
    showSidenav: true
};
