document.addEventListener('DOMContentLoaded', function () {
    const personalityId = 'picx'; // Change this to match the specific page's personality type
    fetch('path/to/results.json')
        .then(response => response.json())
        .then(data => {
            const personality = data.types.find(type => type.id === personalityId);
            if (personality) {
                document.getElementById('personalityType').innerText = personality.type;
                document.getElementById('description').innerText = personality.description;
                
                const breakdownList = document.getElementById('breakdownList');
                for (const [key, value] of Object.entries(personality.breakdown)) {
                    const listItem = document.createElement('li');
                    listItem.innerText = `${key.toUpperCase()}: ${value}`;
                    breakdownList.appendChild(listItem);
                }
                
                document.getElementById('historicalFigure').innerText = `Historical Figure: ${personality.historicalFigure}`;
                document.getElementById('figureDescription').innerText = personality.figureDescription;
            } else {
                console.error('Personality type not found in the JSON data.');
            }
        })
        .catch(error => console.error('Error loading JSON:', error));
});
