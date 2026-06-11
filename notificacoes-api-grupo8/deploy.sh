# deploy.sh — Script de deploy para o servidor

SERVIDOR="root@10.137.146.208"
PASTA="/var/www/notificacoes-api-grupo8"

echo "🚀 Iniciando deploy..."

ssh $SERVIDOR << 'EOF'
  cd /var/www/notificacoes-api-grupo8
  echo "📥 Puxando mudanças do GitHub..."
  git pull
  echo "📦 Instalando dependências..."
  npm install
  echo "🗄️ Executando migrations..."
  npx sequelize-cli db:migrate
  echo "🔄 Reiniciando a aplicação..."
  pm2 restart notificacoes-api
  echo "✅ Deploy concluído!"
  pm2 status
EOF