export interface Image {
    id: string;
    order: string;
    image_file: string;
    image_url: string;
    caption: string;
    bracelets : {
        id: number;
        name: string;
    }[];
}