const newUser = new User({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
});

newUser.save().then(doc => {
    console.log('User created:', doc);
}).catch(err => {
    console.error('Error creating user:', err);
});