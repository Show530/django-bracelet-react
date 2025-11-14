export interface Image {
    id: number;
    order: number;
    image_file: string;
    image_url: string;
    caption: string;
    bracelets : {
        id: number;
        name: string;
    }[];
}