function typeText(identity, textToType) {
  for (let i = 0; i < textToType.length; i++) {
    setTimeout(() => {
      identity.textContent += textToType.charAt(i);
    }, i * 50);
  }
}

