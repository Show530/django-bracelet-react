// explain who i am, experience, etc
// maybe show a few fav creations?
// Footer with instagram, bracelet book, etc
import styled from 'styled-components';

const Container = styled.div`
    margin: 1% 0;
`;

const StyledImage = styled.img`
    width: 30%;
    display: flex;
    justify-self: center;
    border-radius: 20px;
    margin-bottom: 1%;
`;

export default function About() {

    return (
        <Container>
            <StyledImage src="/colorfulProfile.jpg" alt="Picture of me in front of a waterfall"></StyledImage>
            <p>Hi! My name is Sophia Howson, and welcome to my bracelet website!</p>
            <p>I've been making friendship bracelets for 6 years now, and it's a craft that I
                really enjoy. I started crafting right before the pandemic and was able to dive into
                it!
            </p>
            <p>This website is a gallery of all of the creations I've made since 2023, which is
                when I started tracking my bracelet-making data. Each bracelet has data associated with
                it, such as when I started and finished making them. My bracelet handle is
                acc.soph.sories, so all images are watermarked with this handle.
            </p>
            <p> I'm an aspiring software engineer, so this is a bit of info on how I created this site!
                Thus far, this has been created using a React frontend and a Django backend.
            </p>

        </Container>
    );
}