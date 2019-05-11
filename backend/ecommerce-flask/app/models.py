from sqlalchemy import create_engine, Column, Integer, String, DateTime ,BigInteger,\
    ForeignKey, Text, Numeric
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy.orm import relationship, backref
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config

engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
Base = declarative_base()
session = sessionmaker(bind=engine, autocommit = True)()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer(), primary_key = True)
    firstname = Column(String(64),index = True)
    lastname = Column(String(64),index = True)
    email = Column(String(128))
    password_hash = Column(String(255))
    registered_at = Column(DateTime(),default = datetime.now())

    information = relationship("Information")

    @property
    def password(self):
        raise AttributeError('Cannot be accessed')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return "User(id={self.id}" \
               "firstname={self.firstname}, " \
               "lastname={self.lastname})".format(self = self)

class Information(Base):
    __tablename__ = 'information'
    id = Column(Integer(), primary_key = True)
    user_id = Column(Integer(), ForeignKey('users.id'))
    telephone = Column(BigInteger())
    postal_code = Column(BigInteger())
    city = Column(String(28))
    address1 = Column(String(64))
    building = Column(String(64))

    def __repr__(self):
        return "Information(id={self.id}, " \
               "address1={self.address1})".format(self = self)


class Books(Base):
    __tablename__ = 'books'
    id = Column(Integer(), primary_key = True)
    title = Column(String(255), index = True)
    author = Column(String(255), index = True)
    category = Column(String(32), index = True)
    description = Column(Text(32), default = '')
    img = Column(Text(32))
    url = Column(String(128))
    price = Column(Numeric())

class Cart(Base):
    __tablename__ = 'Cart'
    id = Column(Integer(), primary_key = True)
    user_id = Column(Integer(), ForeignKey('users.id'))
    book_id =Column(Integer(), ForeignKey('books.id'))
    quantity = Column(Integer(), nullable = True)
    books = relationship('Books')

