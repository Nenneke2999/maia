\copy customers(snils, full_name, sex, birth, profession, salary, kids) from '/home/maia/git/maia/backend/examples/data/customers.csv' delimiter ';' csv header;
\copy app_history(uuid, customer_id, service, using_time) from '/home/maia/git/maia/backend/examples/data/app_history.csv' delimiter ';' csv header;
\copy credit_history(uuid, customer_id, type, summ, is_correct, created_date) from '/home/maia/git/maia/backend/examples/data/credit_history.csv' delimiter ';' csv header;
\copy insurance_history(uuid, customer_id, type, summ, created_date) from '/home/maia/git/maia/backend/examples/data/insurance_history.csv' delimiter ';' csv header;
