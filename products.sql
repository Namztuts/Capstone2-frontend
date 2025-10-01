--
-- PostgreSQL database dump
--
-- NOTE: just trying to update the SupaBase to have all of the updated products | should be good to go for tomorrow | FORGET THE TESTS

-- Dumped from database version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: namztuts
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    image_url text,
    stock integer DEFAULT 0,
    category_id integer
);


ALTER TABLE public.products OWNER TO namztuts;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: namztuts
--

ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: namztuts
--

COPY public.products (id, name, description, price, image_url, stock, category_id) FROM stdin;
1	Wireless Mouse	A comfortable wireless mouse	25.99	https://example.com/mouse.jpg	50	2
2	Bluetooth Speaker	Portable speaker with great sound	49.99	https://example.com/speaker.jpg	30	2
3	T-shirt	100% Cotton T-shirt	15.00	https://example.com/tshirt.jpg	100	3
4	Cookware Set	10-piece nonstick cookware set	89.99	https://example.com/cookware.jpg	20	4
5	Fiction Book	A best-selling novel	12.50	https://example.com/book.jpg	75	1
6	Smartphone	Latest model with stunning display	699.99	https://example.com/smartphone.jpg	25	2
7	Laptop	Lightweight laptop with powerful performance	999.00	https://example.com/laptop.jpg	15	2
8	Cookbook	Delicious recipes for every meal	18.99	https://example.com/cookbook.jpg	60	1
9	History Book	An in-depth look at world history	22.50	https://example.com/historybook.jpg	40	1
10	Hoodie	Cozy unisex hoodie	35.00	https://example.com/hoodie.jpg	80	3
11	Jeans	Classic fit denim jeans	45.00	https://example.com/jeans.jpg	70	3
12	Blender	High-powered kitchen blender	59.99	https://example.com/blender.jpg	35	4
13	Vacuum Cleaner	Lightweight and powerful vacuum	120.00	https://example.com/vacuum.jpg	18	4
14	Desk Lamp	Adjustable LED desk lamp	29.99	https://example.com/desk-lamp.jpg	45	4
\.


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: namztuts
--

SELECT pg_catalog.setval('public.products_id_seq', 14, true);


--
-- Name: products products_name_key; Type: CONSTRAINT; Schema: public; Owner: namztuts
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_name_key UNIQUE (name);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: namztuts
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: namztuts
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

