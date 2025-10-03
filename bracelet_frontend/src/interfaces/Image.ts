export interface Image {
    id: number;
    image_file: string;
    caption: string;
    bracelets : {
        id: number;
        name: string;
    }[];
}