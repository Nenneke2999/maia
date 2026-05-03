import csv
import random
import uuid
import hashlib

from faker import Faker

fake = Faker()

rows = 10000


# Function to generate a random full name
def generate_full_name():
    return fake.name()


# Function to generate a random flag (boolean)
def generate_bool():
    return random.choice([True, False])


# Function to generate a random age
def generate_age():
    return random.randint(18, 80)


# Function to generate a random country
def generate_country():
    return fake.country()


# Function to generate a random created date
def generate_date():
    year = random.randint(2000, 2023)
    month = random.randint(1, 12)
    day = random.randint(1, 28)
    return f"{year}-{month:02d}-{day:02d}"


# Function to generate random ID
def generate_id():
    return random.randint(1, rows)


# Function to generate random cash
def generate_cash():
    return random.randint(100, 1000000)


# Function to generate a random transaction type
def generate_transaction_type():
    transaction_types = ["Payment", "Transfer", "Withdraw"]
    return random.choice(transaction_types)


# Function to generate a random snils
def generate_snils():
    return "".join(random.choice("0123456789") for _ in range(11))


# Function to generate a unique hash
def generate_hash():
    unique_value = uuid.uuid4().hex
    return hashlib.sha256(unique_value.encode()).hexdigest()


# Function to generate sex
def generate_sex():
    return random.choice(["Male", "Female"])


# Function to generate professions
def generate_profession():
    return fake.job()


# Function to generate kids count
def generate_kids():
    return random.randint(0, 5)


# Function to generate service
def generate_service():
    return random.choice(
        [
            "Deposit",
            "Credit card",
            "Mortgage",
            "Personal area",
            "Consumer loan",
            "Life insurance",
            "Investment products",
        ]
    )


# Function to generate type
def generate_type():
    return random.choice(["Automotive", "Life", "Health", "Property"])


# Generate customers data and write to a CSV file
def generate_customers():
    with open("./examples/data/customers.csv", mode="w", newline="") as file:
        writer = csv.writer(file, delimiter=";")
        writer.writerow(
            [
                "snils",
                "full_name",
                "sex",
                "birth",
                "profession",
                "salary",
                "kids",
            ]
        )

        for _ in range(rows):
            writer.writerow(
                [
                    generate_snils(),
                    generate_full_name(),
                    generate_sex(),
                    generate_date(),
                    generate_profession(),
                    generate_cash(),
                    generate_kids(),
                ]
            )


# Generate app history data and write to a CSV file
def generate_app_history():
    with open("./examples/data/app_history.csv", mode="w", newline="") as file:
        writer = csv.writer(file, delimiter=";")
        writer.writerow(["uuid", "customer_id", "country", "salary"])

        for _ in range(rows):
            writer.writerow(
                [
                    generate_hash(),
                    generate_id(),
                    generate_service(),
                    random.randint(1, 200),
                ]
            )


# Generate credit history data and write to a CSV file
def generate_credit_history():
    with open("./examples/data/credit_history.csv", mode="w", newline="") as file:
        writer = csv.writer(file, delimiter=";")
        writer.writerow(
            ["uuid", "customer_id", "type", "summ", "is_correct", "created_date"]
        )

        for _ in range(rows):
            writer.writerow(
                [
                    generate_hash(),
                    generate_id(),
                    generate_transaction_type(),
                    generate_cash(),
                    generate_bool(),
                    generate_date(),
                ]
            )


# Generate insurance history data and write data to a CSV file
def generate_insurance_history():
    with open("./examples/data/insurance_history.csv", mode="w", newline="") as file:
        writer = csv.writer(file, delimiter=";")
        writer.writerow(["uuid", "customer_id", "type", "summ", "created_date"])

        for _ in range(rows):
            writer.writerow(
                [
                    generate_hash(),
                    generate_id(),
                    generate_type(),
                    generate_cash(),
                    generate_date(),
                ]
            )


if __name__ == "__main__":
    generate_customers()
    generate_app_history()
    generate_credit_history()
    generate_insurance_history()
