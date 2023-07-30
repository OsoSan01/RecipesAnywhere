

//*get page for homepage



exports.homepage = async (req, res) => {
    res.render('index', {title: 'Hungry Bear - Homepage'}); //this is how to pass the title into the template
}