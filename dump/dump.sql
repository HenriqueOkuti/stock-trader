--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone NOT NULL,
    "isValid" boolean NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: stockInfo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."stockInfo" (
    id integer NOT NULL,
    "stockId" integer NOT NULL,
    price money NOT NULL,
    "lastUpdate" timestamp without time zone NOT NULL
);


ALTER TABLE public."stockInfo" OWNER TO postgres;

--
-- Name: stockInfo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."stockInfo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."stockInfo_id_seq" OWNER TO postgres;

--
-- Name: stockInfo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."stockInfo_id_seq" OWNED BY public."stockInfo".id;


--
-- Name: stocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stocks (
    id integer NOT NULL,
    name text NOT NULL,
    "stockTag" text NOT NULL
);


ALTER TABLE public.stocks OWNER TO postgres;

--
-- Name: stocks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stocks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stocks_id_seq OWNER TO postgres;

--
-- Name: stocks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stocks_id_seq OWNED BY public.stocks.id;


--
-- Name: userBalance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."userBalance" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    balance money NOT NULL
);


ALTER TABLE public."userBalance" OWNER TO postgres;

--
-- Name: userBalance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."userBalance_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."userBalance_id_seq" OWNER TO postgres;

--
-- Name: userBalance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."userBalance_id_seq" OWNED BY public."userBalance".id;


--
-- Name: userStocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."userStocks" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "stockId" integer NOT NULL,
    "boughtAt" money NOT NULL,
    "boughtWhen" timestamp without time zone NOT NULL
);


ALTER TABLE public."userStocks" OWNER TO postgres;

--
-- Name: userStocks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."userStocks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."userStocks_id_seq" OWNER TO postgres;

--
-- Name: userStocks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."userStocks_id_seq" OWNED BY public."userStocks".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: stockInfo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."stockInfo" ALTER COLUMN id SET DEFAULT nextval('public."stockInfo_id_seq"'::regclass);


--
-- Name: stocks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stocks ALTER COLUMN id SET DEFAULT nextval('public.stocks_id_seq'::regclass);


--
-- Name: userBalance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userBalance" ALTER COLUMN id SET DEFAULT nextval('public."userBalance_id_seq"'::regclass);


--
-- Name: userStocks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userStocks" ALTER COLUMN id SET DEFAULT nextval('public."userStocks_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, "userId", token, "createdAt", "isValid") FROM stdin;
1	33	95facdc0-98f6-4155-98bc-b98e4103c375	2022-11-09 17:05:17.468682	f
2	33	305eba09-92ff-4ad3-8877-1dbefda6c24e	2022-11-09 17:05:22.520206	f
3	33	29f0bc03-7cd2-40c9-aa52-8d1a64d1d87f	2022-11-09 17:05:26.606629	f
4	33	f82e593d-a8dc-45df-8e1e-8ad9e09f72d5	2022-11-09 17:05:30.431105	f
5	33	a681c3bf-d628-451d-a01c-4f0e17ad9c85	2022-11-09 17:10:51.967929	t
6	35	bfc9fda3-8812-467e-84ef-f0af096a22c0	2022-11-11 21:03:37.056114	f
7	35	ca1306e9-a272-4049-82ae-0b5e03ce24c9	2022-11-11 21:04:22.419979	f
8	35	84c99e79-16bb-4cf3-a8d7-2ae4ca04aa9f	2022-11-11 21:08:57.899839	t
9	36	37b66398-3e38-4fec-b394-456a43fe0f7f	2022-11-11 21:59:27.305724	t
\.


--
-- Data for Name: stockInfo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."stockInfo" (id, "stockId", price, "lastUpdate") FROM stdin;
1	1	R$ 100,00	2022-11-08 21:59:14.365863
2	1	R$ 150,00	2022-11-08 21:59:26.147811
3	1	R$ 130,00	2022-11-08 21:59:40.284823
4	2	R$ 530,00	2022-11-08 21:59:52.192964
5	2	R$ 630,00	2022-11-08 21:59:54.684913
6	2	R$ 730,00	2022-11-08 21:59:57.151659
7	2	R$ 830,00	2022-11-08 21:59:58.665059
8	3	R$ 1,57	2022-11-08 22:00:05.647448
9	3	R$ 1,57	2022-11-08 22:00:07.060067
10	3	R$ 1,57	2022-11-08 22:00:09.870157
11	3	R$ 1,58	2022-11-08 22:00:19.4063
12	3	R$ 1,80	2022-11-08 22:00:23.699441
13	7	R$ 725,25	2022-11-09 22:22:16.716926
16	10	R$ 8.000,00	2022-11-11 21:26:20.41024
17	11	R$ 8.000,01	2022-11-11 21:26:41.539784
\.


--
-- Data for Name: stocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stocks (id, name, "stockTag") FROM stdin;
1	stock 1	ST1
2	stock 2	ST2
3	stock 3	ST3
4	stock 4	ST4
5	stock 5	ST5
7	stock 6	ST6
10	Stock name 2	SN2
11	Stock name 3	SN3
\.


--
-- Data for Name: userBalance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."userBalance" (id, "userId", balance) FROM stdin;
3	2	R$ 1.500,00
4	3	R$ 15.000,00
1	1	R$ 150,00
10	33	R$ 265,83
23	35	R$ 150,00
28	36	R$ 1.000,00
\.


--
-- Data for Name: userStocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."userStocks" (id, "userId", "stockId", "boughtAt", "boughtWhen") FROM stdin;
16	33	7	R$ 725,25	2022-11-11 01:20:53.414256
17	33	3	R$ 1,57	2022-11-11 01:25:59.246064
18	33	3	R$ 1,57	2022-11-11 01:25:59.78926
19	33	3	R$ 1,57	2022-11-11 01:26:00.157068
20	33	3	R$ 1,57	2022-11-11 01:26:00.36766
21	33	3	R$ 1,57	2022-11-11 01:26:00.53517
22	33	3	R$ 1,57	2022-11-11 01:26:00.662636
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	user 1	mail1@mail.com	12345
2	user 2	mail2@mail.com	12345
3	user 3	mail3@mail.com	12345
4	user 4	mail4@mail.com	12345
13	user 5	mail5@mail.com	12345
15	user 6	mail6@mail.com	12345
19	user 7	mail7@mail.com	12345
29	user 8	mail8@mail.com	$2b$10$x5BCOo0bfEHXDQWfOQQFEufyYar5GHamyj8dkJyOsKpb1CYch2Kyi
30	user 9	mail9@mail.com	$2b$10$F9Rkh9qoqclN2LfwdgpT4.BWoCbTj5gQlDXAFApy5ZlKwp5l1aZpu
31	user 10	mail10@mail.com	$2b$10$.KzWl2BIWQUcMIiY11x.ZexMuUxFcPW1hLcjEZkJygF2VaaPQCP9C
33	user 11	mail11@mail.com	$2b$10$LD43tx0I.diz4wZkE8yiPOEKk11CX8ax4Zl7iN8fKFvQ4R1eirhnO
35	Username	email@mail.com	$2b$10$IXF2F.ZAe7tvFOEA2rcdTePMTd5AwAWUCYF2JaDNnHtPCSXP83B5a
36	TEST1	test1@test.com	$2b$10$7aNs8WCPwcURldv6khZS4uL8MOcW9LzVIR6mBZwfu4CgqPjIGQoky
\.


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 9, true);


--
-- Name: stockInfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."stockInfo_id_seq"', 23, true);


--
-- Name: stocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stocks_id_seq', 17, true);


--
-- Name: userBalance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."userBalance_id_seq"', 29, true);


--
-- Name: userStocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."userStocks_id_seq"', 22, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 36, true);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: stockInfo stockInfo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."stockInfo"
    ADD CONSTRAINT "stockInfo_pk" PRIMARY KEY (id);


--
-- Name: stocks stockTag; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stocks
    ADD CONSTRAINT "stockTag" UNIQUE ("stockTag");


--
-- Name: stocks stocks_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stocks
    ADD CONSTRAINT stocks_name_key UNIQUE (name);


--
-- Name: stocks stocks_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stocks
    ADD CONSTRAINT stocks_pk PRIMARY KEY (id);


--
-- Name: userBalance userBalance_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userBalance"
    ADD CONSTRAINT "userBalance_pk" PRIMARY KEY (id);


--
-- Name: userBalance userId; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userBalance"
    ADD CONSTRAINT "userId" UNIQUE ("userId");


--
-- Name: userStocks userStocks_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userStocks"
    ADD CONSTRAINT "userStocks_pk" PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stockInfo stockInfo_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."stockInfo"
    ADD CONSTRAINT "stockInfo_fk0" FOREIGN KEY ("stockId") REFERENCES public.stocks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: userBalance userBalance_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userBalance"
    ADD CONSTRAINT "userBalance_fk0" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: userStocks userStocks_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userStocks"
    ADD CONSTRAINT "userStocks_fk0" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: userStocks userStocks_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userStocks"
    ADD CONSTRAINT "userStocks_fk1" FOREIGN KEY ("stockId") REFERENCES public.stocks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

