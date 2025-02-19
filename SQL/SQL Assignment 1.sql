create database e_commerce;
------
create table Customers (
	customer_id int auto_increment primary key,
    `name` varchar(50),
    email varchar(50),
    mobile varchar(15)
);
create table Products (
	id int,
    `name` varchar(50) not null,
    `description` varchar(200),
    price decimal(10, 2) not null,
    category varchar(50)
);
------
alter table Customers
modify `name` varchar(50) not null; 
alter table Customers
modify email varchar(50) not null; 
alter table Customers
add unique(email); 
alter table Customers
add age int; 
alter table Products
rename column id to product_id; 
alter table Products
modify product_id int auto_increment primary key;
alter table products
modify column description text;
------
create table `Order` (
	order_id int auto_increment primary key,
    customer_id int,
    product_id int,
    quantity int not null,
    order_date date not null,
    `status` enum ('Pending', 'Success', 'Cancel'),
    payment_method enum ('Credit', 'Debit', 'UPI'),
    total_amount decimal(10, 2) not null,
    foreign key (customer_id) references customers(customer_id)
);
------
alter table `Order`
rename Orders;
alter table Orders 
alter `status` set default 'Pending';
alter table Orders
modify column payment_method 
enum ('Credit', 'Debit', 'UPI', 'COD');
alter table Orders
add foreign key (product_id) references products(product_id);
------
insert into Customers (name, email, mobile, age) values
('John Doe', 'john@example.com', '9876543210', 30),
('Jane Smith', 'jane@example.com', '9876543211', 25),
('Alice Johnson', 'alice@example.com', '9876543212', 28),
('Bob Brown', 'bob@example.com', '9876543213', 35),
('Charlie Davis', 'charlie@example.com', '9876543214', 40),
('Eve White', 'eve@example.com', '9876543215', 22),
('Frank Green', 'frank@example.com', '9876543216', 32),
('Grace Lee', 'grace@example.com', '9876543217', 26),
('Henry King', 'henry@example.com', '9876543218', 33),
('Isabel Scott', 'isabel@example.com', '9876543219', 27),
('Jack Harris', 'jack@example.com', '9876543220', 29),
('Kimberly Young', 'kimberly@example.com', '9876543221', 31),
('Liam Turner', 'liam@example.com', '9876543222', 24),
('Megan Wilson', 'megan@example.com', '9876543223', 36),
('Nathan Moore', 'nathan@example.com', '9876543224', 37),
('Olivia Taylor', 'olivia@example.com', '9876543225', 21),
('Paul Adams', 'paul@example.com', '9876543226', 34),
('Quinn Roberts', 'quinn@example.com', '9876543227', 38),
('Rita Clark', 'rita@example.com', '9876543228', 39),
('Sam Anderson', 'sam@example.com', '9876543229', 23),
('Lucas Martinez', 'lucas@example.com', '9876543230', 28),
('Sofia Gonzalez', 'sofia@example.com', '9876543231', 24);
select * from customers;
insert into Products (name, description, price, category) values
('Smartphone A', 'High-end smartphone', 499.99, 'Electronics'),
('Smartphone B', 'Budget smartphone', 199.99, 'Electronics'),
('Laptop X', 'Gaming laptop', 1200.00, 'Electronics'),
('Headphones Y', 'Noise-cancelling headphones', 150.00, 'Electronics'),
('Washing Machine', 'Automatic washing machine', 299.99, 'Home Appliances'),
('Fridge Model Z', 'Energy-efficient fridge', 699.99, 'Home Appliances'),
('Microwave Oven', 'Convection microwave oven', 120.00, 'Home Appliances'),
('Smartwatch', 'Fitness tracking smartwatch', 249.99, 'Electronics'),
('TV 55" UHD', '55 inch Ultra HD TV', 799.99, 'Electronics'),
('Tablet Model P', 'Android tablet', 249.00, 'Electronics'),
('Blender X100', 'High-speed blender', 89.99, 'Kitchen'),
('Toaster Model T', '4-slice toaster', 49.99, 'Kitchen'),
('Air Conditioner', 'Portable air conditioner', 350.00, 'Home Appliances'),
('Bluetooth Speaker', 'Portable wireless speaker', 100.00, 'Electronics'),
('Camera SLR', 'Digital camera SLR', 599.99, 'Electronics'),
('Refrigerator Mini', 'Mini fridge', 120.00, 'Home Appliances'),
('Electric Kettle', 'Electric kettle 1.7L', 25.99, 'Kitchen'),
('Guitar Acoustic', 'Acoustic guitar', 150.00, 'Music'),
('Digital Watch', 'Digital sports watch', 80.00, 'Electronics'),
('Gaming Mouse', 'RGB gaming mouse', 49.99, 'Electronics');
select * from products;
insert into Orders (customer_id, product_id, quantity, order_date, status, payment_method, total_amount) values
(1, 1, 2, '2025-02-01', 'Success', 'Credit', 999.98),
(2, 2, 1, '2025-02-02', 'Success', 'Debit', 199.99),
(3, 3, 1, '2025-02-03', 'Pending', 'UPI', 1200.00),
(4, 4, 2, '2025-02-04', 'Success', 'Credit', 300.00),
(5, 5, 1, '2025-02-05', 'Success', 'Debit', 299.99),
(6, 6, 1, '2025-02-06', 'Cancel', 'UPI', 699.99),
(7, 7, 3, '2025-02-07', 'Success', 'COD', 360.00),
(8, 8, 1, '2025-02-08', 'Pending', 'Credit', 249.99),
(9, 9, 1, '2025-02-09', 'Success', 'Debit', 799.99),
(10, 10, 2, '2025-02-10', 'Success', 'COD', 498.00),
(11, 11, 1, '2025-02-11', 'Pending', 'Credit', 89.99),
(12, 12, 1, '2025-02-12', 'Success', 'Debit', 49.99),
(13, 13, 1, '2025-02-13', 'Success', 'UPI', 350.00),
(14, 14, 1, '2025-02-14', 'Success', 'Credit', 100.00),
(15, 15, 1, '2025-02-15', 'Pending', 'Debit', 599.99),
(16, 16, 2, '2025-02-16', 'Success', 'UPI', 200.00),
(17, 17, 1, '2025-02-17', 'Pending', 'COD', 25.99),
(18, 18, 1, '2025-02-18', 'Success', 'Debit', 150.00),
(19, 19, 1, '2025-02-19', 'Success', 'UPI', 150.00),
(20, 20, 1, '2025-02-20', 'Success', 'Credit', 49.99);
select * from orders;
insert into Products (name, description, price, category) values
('Smartphone C', 'Mid-range smartphone', 349.99, 'Electronics'),
('Laptop Y', 'Ultrabook for professionals', 999.99, 'Electronics'),
('Blender X200', 'Professional-grade blender', 149.99, 'Kitchen'),
('Microwave Deluxe', 'High-performance microwave', 199.99, 'Home Appliances'),
('Gaming Chair', 'Ergonomic gaming chair', 249.99, 'Furniture'),
('Smartphone D', 'Affordable smartphone', 399.99, 'Electronics'),
('Wireless Earbuds', 'Bluetooth earbuds', 89.99, 'Electronics'),
('Laptop Z', 'Premium gaming laptop', 2500.00, 'Electronics'),
('4K TV', 'Ultra HD TV with HDR', 1200.00, 'Electronics'),
('Electric Fan', 'Portable electric fan', 30.00, 'Home Appliances'),
('Plastic Bottle', 'Reusable plastic bottle', 10.00, 'Kitchen'),
('Electric Grill', 'Non-stick electric grill', 59.99, 'Kitchen'),
('Reading Lamp', 'LED reading lamp', 19.99, 'Furniture');
insert into Customers (name, email, mobile, age) values
('John Black', 'johnblack@example.com', '9876543232', 29),
('Emily White', 'emilywhite@example.com', '9876543233', 27);
insert into Orders (customer_id, product_id, quantity, order_date, status, payment_method, total_amount) values
(1, 5, 1, '2025-02-17', 'Success', 'Debit', 299.99),
(2, 6, 2, '2025-02-18', 'Pending', 'UPI', 1399.98),
(3, 7, 1, '2025-02-19', 'Success', 'Credit', 249.99);
------
select category, count(product_id) as product_count
from products
group by category;
select *
from products
where category='Electronics' 
and price between 50 and 500
and name like '%a%';
select * 
from products
where category = 'Electronics' 
order by price desc
limit 5 offset 2;
select * 
from customers
where customer_id not in (select distinct order_id from orders);
select customer_id, avg(total_amount) 
from orders
group by customer_id;
select *
from products
where price < (select avg(price) from products);
select customer_id, sum(quantity) as total_products_ordered
from orders
group by customer_id;
select o.order_id, c.`name` customer_name, p.`name` product_name
from orders o
join customers c on o.customer_id=c.customer_id
join products p on o.product_id=p.product_id;
select *
from products
where product_id not in (select distinct product_id from orders);