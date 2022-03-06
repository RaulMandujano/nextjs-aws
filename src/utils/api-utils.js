export async function  getAllCharacter() {
    return (await fetch(`https://www.breakingbadapi.com/api/characters`)).json();
}