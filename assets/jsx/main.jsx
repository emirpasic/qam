const addButton = document.getElementById('add-button');

addButton.addEventListener('click', () => {
    const textArea = document.getElementById('synonyms');

    const synonyms = [];

    textArea.value.toLowerCase().split('\n').forEach(line => {
        const synonym = line.trim();
        if (synonym.length > 0) synonyms.push(synonym);
    });

    window.fetch('http://localhost:4000/synonym', {
        method: 'POST',
        body: JSON.stringify(synonyms),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(() => textArea.value = '')
        .catch(err => console.error(err));
});

const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const wordInput = document.getElementById('word');
    const word = wordInput.value.trim().toLowerCase();

    window.fetch(`http://localhost:4000/synonym?word=${word}`)
        .then(res => res.json())
        .then(data => {
            const textArea = document.getElementById('result');
            textArea.value = data.join('\n');
        })
        .catch(err => console.error(err));
});