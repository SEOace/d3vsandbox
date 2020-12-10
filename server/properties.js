module.exports = {
	d3vsandbox_db: {
        name: "d3vsandbox_db",
        user: "root",
        password: null,
        host: process.env.DB_HOST || "127.0.0.1",
        port: 3306,
        dialect: "mysql"
    },
    
    publicPath: '../client/build',
	port: 3000,
    tokenSecret: "Insert Your Secret Token",
    api: "/api"
}