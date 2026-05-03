grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй 5 промптов для языковой модели, чтобы подобрать персональное банковское предложение для клиента 40 лет с доходом 100000 рублей в месяц", "model_number": 1}' localhost:6768 pb.PromptService.CorrectInternalPrompt
grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй 5 промптов для персонального банковского предложения для языковой модели", "model_number": 1}' localhost:6768 pb.PromptService.CorrectInternalPrompt
cd ../..
git st
git add .
git st
git ci -m "updating external model"
git push
grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй 5 промптов для персонального банковского предложения для языковой модели", "model_number": 1}' localhost:6768 pb.PromptService.CorrectInternalPrompt
grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй промпт для персонального банковского предложения для языковой модели", "model_number": 1}' localhost:6768 pb.PromptService.CorrectInternalPrompt
./run.sh 
ls
cd front
ls
git pull https://oauth2:glpat-4XYieGry5zQRuBJEDUz9@aftlab.gitlab.yandexcloud.net/finodays-ai/maia-front.git
ls
cd maia-front/
git pull https://oauth2:glpat-4XYieGry5zQRuBJEDUz9@aftlab.gitlab.yandexcloud.net/finodays-ai/maia-front.git
git clone https://oauth2:glpat-4XYieGry5zQRuBJEDUz9@aftlab.gitlab.yandexcloud.net/finodays-ai/maia-front.git
ls
cd src
cd pages
ls
ls -la
cd ~
ls
cd front/
ls
ls maia-front/
cd ~
ls
rm -r front
rm -h
rm --help
rm -r -f front
ls
git clone https://oauth2:glpat-4XYieGry5zQRuBJEDUz9@aftlab.gitlab.yandexcloud.net/finodays-ai/maia-front.git
ls
nvm use 14
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm use 14
command -v nvm
source ~/.bashrc
command -v nvm
nvm use 14
nvm install 14
nvm use 14
npm i
ls
cd maia-front/
npm i
nvm install 19
nvm use 19
npm i
npm audit fix --force
npm i
npm install pm2 -g
npm install uuid
npm audit fix --force
npm install pm2 -g
ls
cd src
cd pages
ls
pm2 start index.js
pm2 logs
pm2 list
cd ..
ls
nano package.json 
pm2 list
pm2 start index.js
cd ./src/pages
pm2 start index.js
pm2 list
pm2 stop index.js
pm2 list
pm2 stop 0
pm2 delete 0

pm2 list
pm2 delete 1
pm2 start index.js -- --port 3000
curl http://localhost:3000
pm2 logs
pm2 list
ip a
curl http://127.0.0.1:3000
pm2 status
рещз
htop
sudo apt install htop
htop
top
sudo kill 58291
df -h
git clone git@gitlab.com:Kotyga/maiia.git
git clone https://gitlab.com/Kotyga/maiia.git
git clone git@gitlab.com:Kotyga/maiia.git
ды
ls
cd maia-front/
ls
docker build -h
docker build -t localhost.node:latest .
docker ps
sudo su
docker ps
exit
df -h
git add .
cd maia-front/
docker build -t localhost.node:latest .
ды
ls
cd backend
cat go.log 
cat int.log 
cat go.log 
docker ps
cd maia-front/
docker build -t localhost.node:latest .
docker run -d -p 80:3000 --name node localhost.node:latest --restart=always
docker ps
docker ps -a
docker logs node
docker run -d -p 80:3000 --name node localhost.node:latest
docker rm node
docker run -d -p 80:3000 --name node localhost.node:latest
docker ps
docker logs node
ls -la
nano package.json 
nano package.json 
docker run -d -p 80:3000 --name node localhost.node:latest
docker rm node
docker run -d -p 80:3000 --name node localhost.node:latest
docker ps
docker logs node
nano package.json 
docker build -t localhost.node:latest .
docker rm node
docker run -d -p 80:3000 --name node localhost.node:latest
docker ps
ls
cd src
cd pages
node index.js
npm start dev
sudo apt install npm
cd ..
cd ..
ls
npm -i
npm run dev
npm run
npm install
npm install
npm -i
npm run dev
npm install
npm -v
nvm use 19.04
node -v
npm update -g
node -v
sudo apt install:latest
npm install npm@latest -g
sudo npm install npm@latest -g
sudo npm install npm@latest -g
sudo npm install npm@latest -g
node -v
nvm install 19.04
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm use 19.04
nvm install 19.04
nvm install 19
nvm use 19
node -v
npm run dev
git add ,
git add .
git status
git add .
cd ~/git/maia/backend
./run.sh
docker rm node
docker stop node
docker rm node
docker ps
watch docker ps
cd .ssh
ls -la
nano authorized_keys 
nano authorized_keys 
env 
docker ps
docker stop --help
docker ps
docker stop $(docker ps -a -q)
ls -la
docker ps
ls -la
docker rmi --help
docker ps -a | grep "nodejs_maia_front" | awk '{print $3}' | xargs docker rmi
awk
xargs
sudo apt install xargs
man xargs
xargs
sudo xargs
sudo apt-get install findutils
sudo xargs
docker ps -a | grep "nodejs_maia_front" | awk '{print $3}' | xargs docker rmi
docker ps -a | grep "nodejs_maia_front" | awk '{print $3}'
docker ps -a | grep "nodejs_maia_front"
docker ps -a | awk '{print $NF}' | grep nodejs_maia_front | xargs docker rm -f
docker ps -a | awk '{print $NF}' | grep nodejs_maia_front
docker run -d -p 80:3000 --name nodejs_maia_front --rm --pull always cr.yandex/crp34p2do0eqesivd528/nodejs_maia_front:latest
docker ps -a | awk '{print $NF}' | grep nodejs_maia_front
docker ps -a | awk '{print $NF}' | grep nodejs_maia_front | xargs docker rm -f
docker ps
docker ps -a | awk '{print $NF}' | grep nodejs_maia_front | xargs docker rm -f
docker ps
docker ps
cont=$(docker ps -a | awk '{print $NF}' | grep nodejs_maia_front) && if [ ! -z $cont ]; then docker rm -f $cont ; f
docker ps
docker ps
docker rm -f nodejs_maia_front 
docker ps
docker ps
ps -ax | grep go
ps -ax | grep python
ls
cd git/maia/backend
cat go.log 
cat int.log 
cat go.log 
df -h
df -h 
df -h 
df -h 
df -h 
df -h 
df -h 
cd ~/git/maia/backend
./run.sh
cd ~/git/maia/backend
./run.sh
./run.sh k
./run.sh
cd ../..
cd maia/models/maiia-ml/
cd maiia-ml/maia/
ls
cp axioma_dialogues.solid_data_model_ruGPTmedium/ ~/git/maia/backend/models/
cp axioma_dialogues.solid_data_model_ruGPTmedium/ ~/git/maia/backend/models/ -r
git pull
grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй 5 промптов для языковой модели", "model_number": 2}' localhost:6768 pb.PromptService.CorrectInternalPrompt
grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй промпт для языковой модели используя данные вкладов банка: 12% годовых на год, 20% годовых на 20 лет, 100% годовых на 200 лет", "model_number": 2}' localhost:6768 pb.PromptService.CorrectInternalPrompt
cd backend
make run-ext-py
cd backend
make run-ext-py
ps -ax | grep python
make run-ext-py
cd backend
cp ~/maia/models/maiia-ml/maiia-ml/maia/prompt_data_model_ruGPTmedium/ models/ -r
du -h models/
grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй промпт для языковой модели используя данные вкладов банка: 12% годовых на год, 20% годовых на 20 лет, 100% годовых на 200 лет", "model_number": 2}' localhost:6768 pb.PromptService.CorrectInternalPrompt
grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй промпт для языковой модели используя данные вкладов банка: 12% годовых на год, 20% годовых на 20 лет, 100% годовых на 200 лет", "model_number": 1}' localhost:6768 pb.PromptService.CorrectInternalPrompt
grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй запрос для другой языковой модели, используя данные вкладов банка: 12% годовых на год, 20% годовых на 20 лет, 100% годовых на 200 лет", "model_number": 1}' localhost:6768 pb.PromptService.CorrectInternalPrompt
grpcurl -plaintext -d '{"internal_prompt": "Создай персональный запрос на тему вкладов для другой языковой модели, используя данные вкладов банка: 12% годовых на год, 20% годовых на 20 лет, 100% годовых на 200 лет", "model_number": 1}' localhost:6768 pb.PromptService.CorrectInternalPrompt
exit
cd backend
make run-et-py
make run-ext-py
exit
git st
git add backend 
git st
git ci -m "updating python models"
git push
exit
cd backend
make run-int-py
exit
cd git/maia/backend
./run.sh 
cat go.log
cat int.log
cat ext.log
ps -ax | grep go
cat ext.log
cat int.log
cat go.log
cat ext.log
cat int.log
cat go.log
./run.sh k
cat go.log
cat int.log
cat ext.log
./run.sh 
cat ext.log
cat int.log
cat go.log
cat int.log
cat ext.log
cat int.log
cat ext.log
cat int.log
cat go.log
cat ext.log
cat go.log
cat int.log
cat go.log
cat ext.log
cat go.log
cat int.log
cat go.log
cat ext.log
cat int.log
cat ext.log
cat go.log
cat int.log
cat go.log
cat int.log
cat ext.log
cat int.log
A
cat int.log
A
cat int.log
cat go.log
cat ext.log
cat go.log
cd backend
cat go.log
sudo lsof -i -P -n | grep 4000 | awk '{print $2}' | xargs kill 2> /dev/null
nohup make run-go > go.log &
cat go.log
cat ext.log
cat int.log
cat ext.log
cat int.log
cat ext.log
cat int.log
cat ext.log
cat go.log
cat ext.log
cat int.log
cat go.log
cat ext.log
cat int.log
docker ps
docker run -d -p 80:3000 --name nodejs_maia_front --rm --pull always cr.yandex/crp34p2do0eqesivd528/nodejs_maia_front:latest
docker ps
docker ps
docker inspect 1512a81c33fd
docker ps
cd ~/git/maia/backend
./run.sh
cd ~/git/maia/backend_for_users
./run.sh
cd ~/git/maia/backend
./run.sh
./run.sh k
./run.sh
./run.sh
./run.sh
./run.sh
cd ~/git/maia/backend
./run.sh k
./run.sh
./run.sh
./run.sh k
./run.sh
cd ~/git/maia/backend
./run.sh
./run.sh k
./run.sh k
./run.sh
df -h
ls
scp D:\User\Downloads\finetune_rugpt_with_prompt_masking_2.zip maia@51.250.108.150:/home/maia/maia/models/maiia-ml
cd backend
make run-int-py
unzip --help
cd ..
unzip finetune_rugpt_with_prompt_masking_2.zip 
ls
ld
ls
s
ls
train
sl
sudo apt install sl
sl
clear
unzip finetune_rugpt_text_to_prompt_batch_4_aug_data_filtred.zip 
grpcurl -plaintext -d '{"text": "Создай промпт для персонального банковского предложения клиента Мужчина, 30 лет, женат, заработная плата 45 000 рублей, высшее образование."}' localhost:6767 pb.PromptService.GetPrompt
grpcurl -plaintext -d '{"internal_prompt": "Сгенерируй 5 промптов для языковой модели", "model_number": 1}' localhost:6768 pb.PromptService.CorrectInternalPrompt
grpcurl -plaintext -d '{"internal_prompt": "Сформируй банковское предложение для клиента: Мужчина, 30 лет, женат, заработная плата 45 000 рублей, высшее образование", "model_number": 1}' localhost:6768 pb.PromptService.CorrectInternalPrompt
grpcurl -plaintext -d '{"text": "Сформируй банковское предложение для клиента: Мужчина, 30 лет, женат, заработная плата 45 000 рублей, высшее образование"}' localhost:6767 pb.PromptService.GetPrompt
cd backend
make run-ext-py
./run.sh 
cat go.log 
cat int.log 
cat go.log 
cd backend
cat go.log 
cat int.log 
cat ext.log 
cat int.log 
grpcurl -plaintext -d '{"text": "Сформируй промпт, который по этим данным клиента сформирует ему лучшее банковское предложение: пол: Female, дата рождения: 2020-11-12, профессия: Clinical embryologist, заработная плата: 129037, количество детей: 4 , если банк имеет следующие предложения по кредитам:"}' localhost:6767 pb.PromptService.GetPrompt
1. Кредит с процентной ставкой от 4% годовых на сумму до 3 млн руб на срок от 1 года до 5 лет
2. Кредит с процентной ставкой от 6,9% годовых на сумму до 5 млн руб на срок от 1 года до 5 лет
3. Кредит с процентной ставкой от 8,9% годовых на сумму до 7 млн руб на срок от 1 года до 7 лет
4. Кредит с процентной ставкой от 8,9% годовых на сумму до 30 млн руб на срок от 1 года до 15 лет
grpcurl -plaintext -d '{"text": "Сформируй промпт, который по этим данным клиента сформирует ему лучшее банковское предложение: пол: Female, дата рождения: 2020-11-12, профессия: Clinical embryologist, заработная плата: 129037, количество детей: 4 , если банк имеет следующие предложения по кредитам:\n1. Кредит с процентной ставкой от 4% годовых на сумму до 3 млн руб на срок от 1 года до 5 лет\n2. Кредит с процентной ставкой от 6,9% годовых на сумму до 5 млн руб на срок от 1 года до 5 лет\n3. Кредит с процентной ставкой от 8,9% годовых на сумму до 7 млн руб на срок от 1 года до 7 лет\n4. Кредит с процентной ставкой от 8,9% годовых на сумму до 30 млн руб на срок от 1 года до 15 лет\n5. Кредит с процентной ставкой от 19,9% годовых на сумму до 1 млн руб на срок от 1 месяца до 5 лет"}' localhost:6767 pb.PromptService.GetPrompt   
cat int.log 
grpcurl -plaintext -d '{"text": "Сформируй промпт, который по этим данным клиента сформирует ему лучшее банковское предложение: пол: Female, дата рождения: 2020-11-12, профессия: Clinical embryologist, заработная плата: 129037, количество детей: 4 , если банк имеет следующие предложения по кредитам:\n1. Кредит с процентной ставкой от 4% годовых на сумму до 3 млн руб на срок от 1 года до 5 лет\n2. Кредит с процентной ставкой от 6,9% годовых на сумму до 5 млн руб на срок от 1 года до 5 лет\n3. Кредит с процентной ставкой от 8,9% годовых на сумму до 7 млн руб на срок от 1 года до 7 лет\n4. Кредит с процентной ставкой от 8,9% годовых на сумму до 30 млн руб на срок от 1 года до 15 лет\n5. Кредит с процентной ставкой от 19,9% годовых на сумму до 1 млн руб на срок от 1 месяца до 5 лет"}' localhost:6767 pb.PromptService.GetPrompt   
grpcurl -plaintext -d '{"text": "Сформируй промпт, который по этим данным клиента сформирует ему лучшее банковское предложение: пол: Female, дата рождения: 2020-11-12, профессия: Clinical embryologist, заработная плата: 129037, количество детей: 4"}' localhost:6767 pb.PromptService.GetPrompt   
grpcurl -plaintext -d '{"text": "Сформируй банковское предложение для клиента: Женщина, 40 лет, холоста, заработная плата 12 000 рублей, 4 детей, высшее образование?"}' localhost:6767 pb.PromptService.GetPrompt   
cd ../..
mkdir tmp
cd tmp/
git clone https://aftlab.gitlab.yandexcloud.net/finodays-ai/maia.git
cd maia/
git co e2e
ls
cd backend
ls
cd ..
cd backend
ls -R
du -a .
du -a . | awk '{print $2}'
du -a . | awk '{print $2}' > files.txt
cd backend
cat int.log 
cat ext.log 
cat go.log 
clear
cd ~/git/maia/backend
./run.sh
cd ~/git/maia/backend
./run.sh
cd ~/git/maia/backend
./run.sh
unzip --help
unzip finetune_rugpt_text_to_prompt_batch_6_gradient_accumulation_step_6_29-10-23_filtred.zip -d ~/git/maia/backend/models/
unzip finetune_rugpt_output_generation_batch_4_gradient_accumulation_step_4_epoch_10_new_29-10-23.zip -d ~/git/maia/backend/models/
cd backend
./run.sh 
cat go.log 
cat int.log 
cat ext.log 
cat int.log 
cat go.log 
cat int.log 
cat ext.log 
cat go.log 
cat ext.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
cat ext.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
cd git/maia/backend
./run.sh 
cat go.log 
cat int.log 
cat ext.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
cat int.log 
cd ~/git/maia/backend
./run.sh
df -h
out
ssh out
ls
unzip finetune_rugpt_text_prompt_batch_4_gradient_accumulation_step_4_epoch_10_new_last_05-10-23.zip -d ~/git/maia/backend/models/
ды
ls
unzip finetune_rugpt_output_generation_batch_4_gradient_accumulation_step_4_epoch_10_new_05-10-23.zip -d ~/git/maia/backend/models/
cd backend
./run.sh 
cat go.log 
cat int.log 
cat ext.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
cd git/maia/backend
./run.sh 
cat go.log 
cat int.log 
cat ext.log 
cat int.log 
cat ext.log 
cat int.log 
cat go.log 
cat int.log 
cat ext.log 
cat int.log 
cat ext.log 
cat go.log 
cat int.log 
cat go.log 
cat ext.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
cat int.log 
cat go.log 
ps -ax
ps -ax | grep go
./run.sh k
./run.sh 
cat go.log 
cat int.log 
cat ext.log 
cat go.log 
cat ext.log 
cat int.log 
cat go.log 
ps -ax | grep go
cat go.log 
./run.sh 
cat go.log 
./run.sh k
./run.sh 
cat go.log 
cat int.log 
cat ext.log 
cat int.log 
cat go.log 
./run.sh k
./run.sh 
cat go.log 
cat int.log 
cat ext.log 
cat go.log 
cat ext.log 
cat int.log 
cat go.log 
cat int.log 
cat ext.log 
cat int.log 
cat go.log 
tail -f go.log 
cat go.log 
cat int.log 
cat ext.log 
cat go.log 
cat int.log 
cat go.log 
./run.sh k
./run.sh 
cat go.log 
tail -f go.log 
./run.sh k
./run.sh 
tail -f go.log 
tail -f int.log 
clear
tail -f int.log 
