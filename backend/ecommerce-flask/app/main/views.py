from flask import request, jsonify, send_file
import json
from . import main
from ..models import User,Information, Books, Cart, session
from collections import OrderedDict
from base64 import b64encode
import os

@main.route("/signup", methods=['POST'])
def signup():
    data = json.loads(request.data.decode('utf-8'))
    user = User(firstname = data['firstname'],
                lastname = data['lastname'],
                email = data['email'],
                password = data['password'],
                )
    session.add(user)
    session.flush()
    user_information = Information(user_id = user.id,
                                   telephone = data['tel'],
                                   postal_code = data['postCode'],
                                   city = data['city'],
                                   address1 = data['address1'],
                                   building = data['building']
                                   )
    session.add(user_information)
    session.flush()
    session.commit()
    return jsonify({'result': 'success'})

@main.route("/login", methods=['POST'])
def login():
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    user = session.query(User).filter(User.email == data['email']).one_or_none()
    session.close()
    if user is not None:
        if user.verify_password(data['password']):
            return jsonify({'result': 'valid',
                            'id': user.id} )

    return jsonify({'result': 'invalid'})

@main.route("/user/<int:id>", methods=['GET'])
def get_user(id):
    user = session.query(User).get(id)
    user_dict = user.__dict__

    inf_dict = user.information[0].__dict__

    user_dict.update(inf_dict)
    user_dict.pop("_sa_instance_state")
    user_dict.pop("information")
    user_dict.pop("registered_at")
    user_dict.pop("password_hash")
    user_dict.pop("user_id")
    return jsonify({'user': user_dict})

def get_img(filename):
    img_format  = filename.split('.')[-1]
    filename = os.path.realpath(os.path.join(os.path.dirname(__file__),'..', 'static', 'img', filename ))
    with open(filename, 'rb') as fin:
        byte_content = fin.read()
    base64_bytes = b64encode(byte_content)
    base64_string = base64_bytes.decode('utf-8')
    return 'data:image/{0};base64,{1}'.format(img_format, base64_string)

@main.route("/books", methods=['GET'])
def get_books():
    books = session.query(Books).all()
    return jsonify({'books': [dict(title= book.title,
                                   author = book.author,
                                   description = book.description,
                                   img = get_img(book.img),
                                   category = book.category,
                                   id = book.id,
                                   price = float(book.price)
                                   ) for book in books]})

@main.route('/cart/<int:user_id>' ,methods= ['GET', 'POST'])
def get_cart(user_id):
    if request.method =='GET':
        cart = session.query(Cart).filter(Cart.user_id == int(user_id)).all()

        return jsonify({'cart': [dict(title = c.books.title,
                                       author = c.books.author,
                                       description = c.books.description,
                                       img = get_img(c.books.img),
                                       category = c.books.category,
                                       id = c.books.id,
                                       price = float(c.books.price),
                                      qty = c.quantity
                                       ) for c in cart]})

    elif request.method == 'POST':
        data = json.loads(request.data.decode('utf-8'))
        book_id = int(data['book_id'])
        book = session.query(Cart).filter(Cart.book_id == book_id ).one_or_none()
        quantity = data.get('qty') or 1
        if book is None:
            session.add(Cart(user_id = user_id,
                                  book_id = book_id ,
                                    quantity = quantity
                             ))
        else:
            book.quantity = quantity

        # session.commit()

        return jsonify({'transaction': 'success'})