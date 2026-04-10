from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text, DateTime, CheckConstraint
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

# -------------------- USERS --------------------
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # admin, seller, user
    created_at = Column(DateTime, default=datetime.utcnow)

    products = relationship("Product", back_populates="seller")
    reviews = relationship("Review", back_populates="user")
    orders = relationship("Order", back_populates="user")


# -------------------- CATEGORIES --------------------
class Category(Base):
    __tablename__ = "categories"

    category_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    products = relationship("Product", back_populates="category")


# -------------------- PRODUCTS --------------------
class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)

    category_id = Column(Integer, ForeignKey("categories.category_id"))
    seller_id = Column(Integer, ForeignKey("users.user_id"))

    created_at = Column(DateTime, default=datetime.utcnow)

    category = relationship("Category", back_populates="products")
    seller = relationship("User", back_populates="products")
    reviews = relationship("Review", back_populates="product")


# -------------------- CART --------------------
class Cart(Base):
    __tablename__ = "cart"

    cart_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    product_id = Column(Integer, ForeignKey("products.product_id"))
    quantity = Column(Integer, default=1)


# -------------------- ORDERS --------------------
class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    total_amount = Column(Float)
    status = Column(String, default="placed")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")


# -------------------- ORDER ITEMS --------------------
class OrderItem(Base):
    __tablename__ = "order_items"

    order_item_id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.order_id"))
    product_id = Column(Integer, ForeignKey("products.product_id"))

    quantity = Column(Integer)
    price = Column(Float)

    order = relationship("Order", back_populates="items")


# -------------------- REVIEWS --------------------
class Review(Base):
    __tablename__ = "reviews"

    review_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    product_id = Column(Integer, ForeignKey("products.product_id"))

    rating = Column(Integer, nullable=False)
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        CheckConstraint("rating >= 1 AND rating <= 5"),
    )

    user = relationship("User", back_populates="reviews")
    product = relationship("Product", back_populates="reviews")


# -------------------- INVENTORY LOG --------------------
class InventoryLog(Base):
    __tablename__ = "inventory_logs"

    log_id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.product_id"))
    change = Column(Integer)
    reason = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)