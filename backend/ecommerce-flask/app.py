from app import create_app

app = create_app()


app.run(debug=True,use_reloader=True, host = 'localhost', port = 5000)
