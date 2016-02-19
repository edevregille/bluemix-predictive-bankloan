# Bluemix Predictive Analytics Demo App

Calculate bank loan scoring based on a model created using SPSS

# How to Deploy

1. Deploy the application on Bluemix
```
  git clone https://github.com/edevregille/bluemix-predictive-bankloan.git
```
Update the manifest file with the name of your application and push it to your Bluemix account with the following commands:

```
  cf login 
  
```

Go to the root folder of the manifest file (app folder) and then:

```
  cf push
```

2. Create a Predictive Analytics service from your Bluemix dashboard (go the bluemix catalogue). Create this service in the same organization and space than the application you just have deployed.

3. Upload the model to the service Predictive Analytics that you just have created (you can find the model file in the folder 'model') and name 'bank' the context. If you call it differently, update the source code contextID value.

4. Bind the Predicive Service to your application
